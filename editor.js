const defaultLCI = `HAI 1.2

HOW IZ I FAC YR N
    BOTH SAEM N AN 0, O RLY?
        YA RLY, FOUND YR 1
        NO WAI, FOUND YR PRODUKT OF N AN I IZ FAC YR DIFF OF N AN 1 MKAY
    OIC
IF U SAY SO

OBTW
    ALERTIN is a function defined by this specific implementation
    that opens a JavaScript alert dialog.
    Also see LOGGIN, which does the same thing but with logs.
TLDR

I IZ ALERTIN YR "Input a number to factorial. Please, keep it small." MKAY
GIMMEH N
VISIBLE N "! = " I IZ FAC YR N MKAY

KTHXBYE`;
const defaultNix = `let
    inc = x: x + 1;
in {
    x = inc 5;
}`;
const wasm = wasm_bindgen;

window.onload = function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/terminal");
    editor.session.setMode("ace/mode/lolcode")
    editor.focus();

    let lang = document.getElementById("lang");

    function save(lang) {
        if (lang == "lci") {
            localStorage.setItem("lci_code", editor.getValue());
        } else if (lang == "nix") {
            localStorage.setItem("nix_code", editor.getValue());
        }
    }
    function load(lang) {
        if (lang == "lci") {
            editor.setValue(localStorage.getItem("lci_code") || defaultLCI);
        } else if (lang == "nix") {
            editor.setValue(localStorage.getItem("nix_code") || defaultNix);
        }
    }

    load(lang.value);

    window.onbeforeunload = function() {
        save(lang.value);
    };

    let previous = lang.value;
    lang.onchange = function() {
        save(previous);
        load(this.value);
        previous = this.value;
    };

    let output = document.getElementById("output");
    output.innerText = "Loading Web Assembly...";

    wasm("wasm_bg.wasm").then(() => {
        output.innerText = "";

        document.getElementById("run").onclick = function() {
            let result;
            if (lang.value == "lci") {
                result = wasm.lci_eval(editor.getValue());
            } else if (lang.value == "nix") {
                result = wasm.nix_parse(editor.getValue());
            }

            output.innerText = result;
        };
    }).catch(err => {
        output.innerText = wasmError + err;
    });
};
