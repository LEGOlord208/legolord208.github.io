
(function() {
    var wasm;
    const __exports = {};
    
    
    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }
    
    function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        return [ptr, arg.length];
    }
    
    let cachedDecoder = new TextDecoder('utf-8');
    
    function getStringFromWasm(ptr, len) {
        return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
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
    * @param {Uint8Array} arg0
    * @returns {string}
    */
    __exports.image_to_string = function(arg0) {
        const [ptr0, len0] = passArray8ToWasm(arg0);
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
    
    let cachedEncoder = new TextEncoder('utf-8');
    
    function passStringToWasm(arg) {
        
        const buf = cachedEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        return [ptr, buf.length];
    }
    /**
    * @param {string} arg0
    * @returns {string}
    */
    __exports.nix_parse = function(arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        const retptr = globalArgumentPtr();
        wasm.nix_parse(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;
        
    };
    
    __exports.__wbg_alert_e63a4c41bbd7a3e9 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        alert(varg0);
    };
    
    __exports.__wbg_prompt_1df96ced05db9f67 = function(ret) {
        
        const [retptr, retlen] = passStringToWasm(prompt());
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;
        
    };
    
    const __wbg_log_12af4e1f5b304c40_target = console.log;
    
    __exports.__wbg_log_12af4e1f5b304c40 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        __wbg_log_12af4e1f5b304c40_target(varg0);
    };
    
    const __wbg_random_3b8f4e8b8d62bcb3_target = Math.random;
    
    __exports.__wbg_random_3b8f4e8b8d62bcb3 = function() {
        return __wbg_random_3b8f4e8b8d62bcb3_target();
    };
    
    const __wbg_write_354580607841d1c9_target = Terminal.prototype.write || function() {
        throw new Error(`wasm-bindgen: Terminal.prototype.write does not exist`);
    };
    
    const stack = [];
    
    const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];
    
    function getObject(idx) {
        if ((idx & 1) === 1) {
            return stack[idx >> 1];
        } else {
            const val = slab[idx >> 1];
            
            return val.obj;
            
        }
    }
    
    __exports.__wbg_write_354580607841d1c9 = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        __wbg_write_354580607841d1c9_target.call(getObject(arg0), varg1);
    };
    
    let slab_next = slab.length;
    
    function addHeapObject(obj) {
        if (slab_next === slab.length) slab.push(slab.length + 1);
        const idx = slab_next;
        const next = slab[idx];
        
        slab_next = next;
        
        slab[idx] = { obj, cnt: 1 };
        return idx << 1;
    }
    /**
    * @param {any} arg0
    * @returns {number}
    */
    __exports.chess_new = function(arg0) {
        return wasm.chess_new(addHeapObject(arg0));
    };
    
    /**
    * @param {number} arg0
    * @returns {void}
    */
    __exports.chess_draw = function(arg0) {
        return wasm.chess_draw(arg0);
    };
    
    /**
    * @param {number} arg0
    * @param {string} arg1
    * @returns {void}
    */
    __exports.chess_cmd = function(arg0, arg1) {
        const [ptr1, len1] = passStringToWasm(arg1);
        try {
            return wasm.chess_cmd(arg0, ptr1, len1);
            
        } finally {
            wasm.__wbindgen_free(ptr1, len1 * 1);
            
        }
        
    };
    
    /**
    * @param {number} arg0
    * @returns {void}
    */
    __exports.chess_free = function(arg0) {
        return wasm.chess_free(arg0);
    };
    
    /**
    * @param {string} arg0
    * @returns {string}
    */
    __exports.lci_eval = function(arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        const retptr = globalArgumentPtr();
        wasm.lci_eval(retptr, ptr0, len0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;
        
    };
    
    function dropRef(idx) {
        
        idx = idx >> 1;
        if (idx < 4) return;
        let obj = slab[idx];
        
        obj.cnt -= 1;
        if (obj.cnt > 0) return;
        
        // If we hit 0 then free up our space in the slab
        slab[idx] = slab_next;
        slab_next = idx;
    }
    
    __exports.__wbindgen_object_drop_ref = function(i) {
        dropRef(i);
    };
    
    __exports.__wbindgen_throw = function(ptr, len) {
        throw new Error(getStringFromWasm(ptr, len));
    };
    
    function init(wasm_path) {
        const fetchPromise = fetch(wasm_path);
        let resultPromise;
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            resultPromise = WebAssembly.instantiateStreaming(fetchPromise, { './wasm': __exports });
        } else {
            resultPromise = fetchPromise
            .then(response => response.arrayBuffer())
            .then(buffer => WebAssembly.instantiate(buffer, { './wasm': __exports }));
        }
        return resultPromise.then(({instance}) => {
            wasm = init.wasm = instance.exports;
            return;
        });
    };
    self.wasm_bindgen = Object.assign(init, __exports);
})();

