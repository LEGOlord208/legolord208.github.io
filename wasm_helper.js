function readCStringRaw(array) {
    let string = "";
    let cursor = 0;
    while (array[cursor] != 0) {
        string += String.fromCharCode(array[cursor]);
        cursor += 1;
    }
    return string.replace(/\n/g, "\r\n"); // https://github.com/xtermjs/xterm.js/issues/145
}
function readCString(exports, offset) {
    let buffer = new Uint8Array(exports.memory.buffer, offset);
    let string = readCStringRaw(buffer);
    exports.free(offset);
    return string;
}
function readCStringUtf16(exports, offset) {
    let buffer = new Uint16Array(exports.memory.buffer, offset);
    let string = readCStringRaw(buffer);
    exports.free(offset);
    return string;
}

function newCStringUtf16(exports, string) {
    let rawString = exports.string_new(string.length);
    for (i in string) {
        exports.string_set(rawString, string.length, i, string.charCodeAt(i))
    }

    return rawString;
}

function loadWasm(wasm, obj) {
    return fetch(wasm)
            .then(r => r.arrayBuffer())
            .then(r => WebAssembly.instantiate(r, obj));
}
