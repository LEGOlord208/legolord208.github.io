function readCStringRaw(array) {
    let string = "";
    let cursor = 0;
    while (array[cursor] != 0) {
        string += String.fromCharCode(array[cursor]);
        cursor += 1;
    }
    return string.replace(/\n/g, "\r\n"); // https://github.com/xtermjs/xterm.js/issues/145
}
function readCString(memBuffer, offset) {
    let buffer = new Uint8Array(memBuffer, offset);
    return readCStringRaw(buffer);
}
function readCStringUtf16(memBuffer, offset) {
    let buffer = new Uint16Array(memBuffer, offset);
    return readCStringRaw(buffer);
}

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
    xterm.write("\n" + shellPrompt);

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

    fetch("termplay-wasm/target/wasm32-unknown-unknown/release/termplay_wasm.wasm")
        .then(r => r.arrayBuffer())
        .then(r => WebAssembly.instantiate(r))
        .then(termplay => {
            let fileTarget = document.getElementById("termplay").firstElementChild;
            fileTarget.onchange = function(e) {
                let reader = new FileReader();
                reader.onload = function(file) {
                    xterm.write("termplay \"" + e.target.files[0].name + "\"\r\n");

                    let data = new Uint8Array(file.target.result);
                    let len = data.length;

                    let exports = termplay.instance.exports;

                    let slice = exports.slice_new(len);
                    for (let i = 0; i < len; ++i) {
                        exports.slice_set(slice, len, i, data[i]);
                    }

                    let offset = exports.image_to_string(slice, len);
                    let string = readCString(exports.memory.buffer, offset);
                    exports.free(offset);

                    xterm.write(string + "\r\n");
                    xterm.write(shellPrompt);
                };
                reader.readAsArrayBuffer(e.target.files[0]);
            };
        });

    fetch("insult-wasm/target/wasm32-unknown-unknown/release/insult_wasm.wasm")
        .then(r => r.arrayBuffer())
        .then(r => WebAssembly.instantiate(r, { env: { rand: function() { return Math.random(); } } }))
        .then(insult => {
            let button = document.getElementById("insult").firstElementChild;
            button.onclick = function() {
                xterm.write("insult\r\n");

                let exports = insult.instance.exports;

                let offset = exports.insult();
                let string = readCString(exports.memory.buffer, offset);
                exports.free(offset);

                xterm.write(string + "\r\n");
                xterm.write(shellPrompt);
            };
        });

    let p = null;

    fetch("crappy-chess-minimax-wasm/target/wasm32-unknown-unknown/release/crappy_chess_minimax_wasm.wasm")
        .then(r => r.arrayBuffer())
        .then(r => WebAssembly.instantiate(r, { env: { rand: function() { return Math.random(); } } }))
        .then(chess => {
            let button = document.getElementById("chess").firstElementChild;
            button.onclick = function() {
                xterm.write("crappy-chess-minimax\r\n");

                let exports = chess.instance.exports;

                if (p == null) {
                    p = exports.prompt_new();
                }

                function prompt_print() {
                    let offset = exports.prompt_print(p);
                    let string = readCStringUtf16(exports.memory.buffer, offset);
                    exports.free(offset);

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
                        let input = exports.string_new(line.length);

                        for (i in line) {
                            exports.string_set(input, line.length, i, line.charCodeAt(i))
                        }

                        let offset = exports.prompt_input(p, input); // this frees `input`
                        let string = readCStringUtf16(exports.memory.buffer, offset);
                        exports.free(offset);

                        xterm.write(string + "\r\n");
                        prompt_print();
                    }
                };
            };
        });
};
