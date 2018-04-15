window.onload = function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/terminal");

    editor.setValue(localStorage.getItem("code") || "");

    window.onbeforeunload = function() {
        localStorage.setItem("code", editor.getValue());
    };

    let output = document.getElementById("output");

    loadWasm(
        "lolcode-wasm/target/wasm32-unknown-unknown/release/lolcode_wasm.wasm",
        { env: { fmod: function(x, y) { x % y } } }
    )
        .then(lolcode => {
            let exports = lolcode.instance.exports;

            document.getElementById("run").onclick = function() {
                console.log("converting");
                let code = newCStringUtf16(exports, editor.getValue());
                console.log("executing");
                let result = readCStringUtf16(exports, exports.eval(code));
                console.log("freeing");
                exports.free(code);

                console.log("result: ", result);
                output.innerText = result;
            };
        });
};
