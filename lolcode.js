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

    output.innerText = "Loading Web Assembly...";
    loadWasm().then(wasm => {
        let exports = wasm.instance.exports;
        output.innerText = "";

        document.getElementById("run").onclick = function() {
            let code = newCStringUtf16(exports, editor.getValue());
            let result = readCStringUtf16(exports, exports.eval(code));
            exports.free_utf16(code);

            output.innerText = result;
        };
    });
};
