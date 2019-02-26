(function() {
    var wasm;
    const __exports = {};


    let cachedTextEncoder = new TextEncoder('utf-8');

    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }

    let WASM_VECTOR_LEN = 0;

    function passStringToWasm(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let cachedTextDecoder = new TextDecoder('utf-8');

    function getStringFromWasm(ptr, len) {
        return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
    }

    let cachedGlobalArgumentPtr = null;
    function globalArgumentPtr() {
        if (cachedGlobalArgumentPtr === null) {
            cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
    }

    let cachegetUint32Memory = null;
    function getUint32Memory() {
        if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
            cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachegetUint32Memory;
    }
    /**
    * @param {string} arg0
    * @returns {string}
    */
    __exports.lci_eval = function(arg0) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        wasm.lci_eval(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

    /**
    * @param {string} arg0
    * @returns {string}
    */
    __exports.nix_parse = function(arg0) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        wasm.nix_parse(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

    function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
    }
    /**
    * @param {Uint8Array} arg0
    * @returns {string}
    */
    __exports.image_to_string = function(arg0) {
        const ptr0 = passArray8ToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        try {
            wasm.image_to_string(retptr, ptr0, len0);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];

            const realRet = getStringFromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;


        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    };

    __exports.__wbg_alert_e63a4c41bbd7a3e9 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        alert(varg0);
    };

    __exports.__wbg_prompt_1df96ced05db9f67 = function(ret) {

        const retptr = passStringToWasm(prompt());
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };

    __exports.__wbg_log_12af4e1f5b304c40 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        console.log(varg0);
    };

    __exports.__wbg_random_3b8f4e8b8d62bcb3 = function() {
        return Math.random();
    };

    const heap = new Array(32);

    heap.fill(undefined);

    heap.push(undefined, null, true, false);

    let heap_next = heap.length;

    function addHeapObject(obj) {
        if (heap_next === heap.length) heap.push(heap.length + 1);
        const idx = heap_next;
        heap_next = heap[idx];

        heap[idx] = obj;
        return idx;
    }
    /**
    * @returns {string}
    */
    __exports.insult = function() {
        const retptr = globalArgumentPtr();
        wasm.insult(retptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

function getObject(idx) { return heap[idx]; }

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

__exports.__wbg_call_88d2a6153573084e = function(arg0, arg1, arg2, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)));
    } catch (e) {
        handleError(exnptr, e);
    }
};

__exports.__wbg_call_7d492f332f3e8798 = function(arg0, arg1, arg2, arg3, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3)));
    } catch (e) {
        handleError(exnptr, e);
    }
};

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

__exports.__wbindgen_object_drop_ref = function(i) { dropObject(i); };

__exports.__wbindgen_string_new = function(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
};

__exports.__wbindgen_debug_string = function(i, len_ptr) {
    const toString = Object.prototype.toString;
    const debug_str = val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
};
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
};

function freeCanMove(ptr) {

    wasm.__wbg_canmove_free(ptr);
}
/**
*/
class CanMove {

    static __wrap(ptr) {
        const obj = Object.create(CanMove.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeCanMove(ptr);
    }

    /**
    * @returns {boolean}
    */
    get illegal() {
        return (wasm.__wbg_get_canmove_illegal(this.ptr)) !== 0;
    }
    set illegal(arg0) {
        return wasm.__wbg_set_canmove_illegal(this.ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get checkmate() {
        return (wasm.__wbg_get_canmove_checkmate(this.ptr)) !== 0;
    }
    set checkmate(arg0) {
        return wasm.__wbg_set_canmove_checkmate(this.ptr, arg0);
    }
    /**
    * @returns {string}
    */
    check() {
        const retptr = globalArgumentPtr();
        wasm.canmove_check(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        if (rustptr === 0) return;
        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
}
__exports.CanMove = CanMove;

function freeChessTerm(ptr) {

    wasm.__wbg_chessterm_free(ptr);
}
/**
*/
class ChessTerm {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeChessTerm(ptr);
    }

    /**
    * @param {any} arg0
    * @returns {}
    */
    constructor(arg0) {
        this.ptr = wasm.chessterm_new(addHeapObject(arg0));
    }
    /**
    * @returns {void}
    */
    draw() {
        return wasm.chessterm_draw(this.ptr);
    }
    /**
    * @param {string} arg0
    * @returns {void}
    */
    command(arg0) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        try {
            return wasm.chessterm_command(this.ptr, ptr0, len0);

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
}
__exports.ChessTerm = ChessTerm;

function freeChessBoard(ptr) {

    wasm.__wbg_chessboard_free(ptr);
}
/**
*/
class ChessBoard {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeChessBoard(ptr);
    }

    /**
    * @returns {}
    */
    constructor() {
        this.ptr = wasm.chessboard_new();
    }
    /**
    * @param {string} arg0
    * @param {string} arg1
    * @returns {CanMove}
    */
    can_move(arg0, arg1) {
        const ptr0 = passStringToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm(arg1);
        const len1 = WASM_VECTOR_LEN;
        try {
            return CanMove.__wrap(wasm.chessboard_can_move(this.ptr, ptr0, len0, ptr1, len1));

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            wasm.__wbindgen_free(ptr1, len1 * 1);

        }

    }
    /**
    * @param {any} arg0
    * @returns {boolean}
    */
    do_move(arg0) {
        return (wasm.chessboard_do_move(this.ptr, addHeapObject(arg0))) !== 0;
    }
}
__exports.ChessBoard = ChessBoard;

__exports.__wbindgen_throw = function(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
};

function init(path_or_module) {
    let instantiation;
    const imports = { './wasm': __exports };
    if (path_or_module instanceof WebAssembly.Module) {
        instantiation = WebAssembly.instantiate(path_or_module, imports)
        .then(instance => {
        return { instance, module: path_or_module }
    });
} else {
    const data = fetch(path_or_module);
    if (typeof WebAssembly.instantiateStreaming === 'function') {
        instantiation = WebAssembly.instantiateStreaming(data, imports)
        .catch(e => {
            console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
            return data
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        });
    } else {
        instantiation = data
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.instantiate(buffer, imports));
    }
}
return instantiation.then(({instance}) => {
    wasm = init.wasm = instance.exports;

});
};
self.wasm_bindgen = Object.assign(init, __exports);
})();
