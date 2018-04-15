const defaultCode = `HAI 1.2

HOW IZ I FAC YR N
    BOTH SAEM N AN 0, O RLY?
        YA RLY, FOUND YR 1
        NO WAI, FOUND YR PRODUKT OF N AN I IZ FAC YR DIFF OF N AN 1 MKAY
    OIC
IF U SAY SO

VISIBLE "5! = " I IZ FAC YR 5 MKAY

KTHXBYE`;

window.onload = function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/terminal");
    editor.session.setMode("ace/mode/lolcode")
    editor.setValue(localStorage.getItem("code") || defaultCode);
    editor.focus();

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
                let code = newCStringUtf16(exports, editor.getValue());
                let result = readCStringUtf16(exports, exports.eval(code));
                exports.free(code);

                output.innerText = result;
            };
        });
};
