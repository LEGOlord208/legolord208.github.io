window.onload = function() {
    let shellPrompt = "totally-not-fake-bash$ ";

    let controls = document.getElementById("controls");

    let terminal = document.getElementById("terminal");
    let xterm = new Terminal();
    xterm.open(terminal);
    xterm.write("Welcome to the jD91mZM2 software hub.\r\n");
    xterm.write("The purpose of this is to have a few online demos of my software.\r\n");
    xterm.write("This is because I have nothing better to do on my website anyway.\r\n");
    xterm.write("WebAssembly is pretty cool <3\r\n");
    xterm.write("Loading...\r\n");

    let line = "";
    let lineHandler = null;

    xterm.textarea.onkeydown = function(e) {
        if (lineHandler != null) {
            if (e.keyCode == 8) {
                xterm.write("\x1b[D\x1b[K");
                line = line.substring(0, line.length - 1);
            } else if (e.keyCode == 13) {
                xterm.write("\r\n");
                lineHandler(line);
                line = "";
            } else if (e.ctrlKey && (e.key == 'd' || e.key == 'c')) {
                xterm.write("^" + e.key.toUpperCase() + "\r\n");
                lineHandler(null);
                line = "";

                controls.classList.remove("disabled");
                xterm.write(shellPrompt);
            }
        }
    };
    xterm.textarea.onkeypress = function(e) {
        if (lineHandler != null) {
            line += e.key;
            xterm.write(e.key);
        }
    };

    loadWasm().then(wasm => {
        let exports = wasm.instance.exports;

        xterm.write("\n" + shellPrompt);

        document.getElementById("termplay").firstElementChild.onchange = function(e) {
            let reader = new FileReader();
            reader.onload = function(file) {
                xterm.write("termplay \"" + e.target.files[0].name + "\"\r\n");

                let data = new Uint8Array(file.target.result);
                let len = data.length;

                let slice = exports.slice_new(len);
                for (let i = 0; i < len; ++i) {
                    exports.slice_set(slice, len, i, data[i]);
                }

                let offset = exports.image_to_string(slice, len);
                exports.slice_free(slice, len);
                let string = readCString(exports, offset);

                xterm.write(string + "\r\n");
                xterm.write(shellPrompt);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        };

        document.getElementById("insult").firstElementChild.onclick = function() {
            xterm.write("insult\r\n");

            let string = readCStringUtf16(exports, exports.insult());

            xterm.write(string + "\r\n");
            xterm.write(shellPrompt);
        };

        var p = null;

        document.getElementById("chess").firstElementChild.onclick = function() {
            xterm.write("crappy-chess-minimax\r\n");

            if (p == null) {
                p = exports.prompt_new();
            }

            function prompt_print() {
                let string = readCStringUtf16(exports, exports.prompt_print(p));
                xterm.write(string);
            }

            prompt_print();

            controls.classList.add("disabled");
            lineHandler = function(line) {
                if (line == null) {
                    lineHandler = null;
                    exports.prompt_free(p);
                    p = null;
                } else {
                    let input = newCStringUtf16(exports, line);

                    let offset = exports.prompt_input(p, input);
                    exports.free_utf16(input);
                    let string = readCStringUtf16(exports, offset);

                    xterm.write(string + "\r\n");
                    prompt_print();
                }
            };
        };
    });
};
