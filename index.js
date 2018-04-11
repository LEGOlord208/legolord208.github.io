function readCString(memBuffer, offset) {
    let buffer = new Uint8Array(memBuffer);
    let string = "";
    let cursor = offset;
    while (buffer[cursor] != 0) {
        string += String.fromCharCode(buffer[cursor]);
        cursor += 1;
    }
    return string
}

window.onload = function() {
    let shellPrompt = "totally-not-fake-bash$ ";

    let terminal = document.getElementById("terminal");
    let xterm = new Terminal();
    xterm.open(terminal);
    xterm.write("Welcome to the jD91mZM2 software hub.\r\n");
    xterm.write("The purpose of this is to have a few online demos of my software.\r\n");
    xterm.write("This is because I have nothing better to do on my website anyway.\r\n");
    xterm.write("WebAssembly is pretty cool <3\r\n");
    xterm.write("\n" + shellPrompt);

    fetch("termplay-wasm/target/wasm32-unknown-unknown/release/termplay.wasm")
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

                    xterm.write(string + "\r\n");
                    exports.free(offset);

                    xterm.write(shellPrompt);
                };
                reader.readAsArrayBuffer(e.target.files[0]);
            };
        });

    fetch("insult-wasm/target/wasm32-unknown-unknown/release/insult.wasm")
        .then(r => r.arrayBuffer())
        .then(r => WebAssembly.instantiate(r, { env: { rand: function() { return Math.random(); } } }))
        .then(insult => {
            let button = document.getElementById("insult").firstElementChild;
            button.onclick = function() {
                xterm.write("insult\r\n");

                let exports = insult.instance.exports;
                let offset = exports.insult();
                let string = readCString(exports.memory.buffer, offset);

                xterm.write(string + "\r\n");
                exports.free(offset);

                xterm.write(shellPrompt);
            };
        });
};
