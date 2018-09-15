
(function() {
    var wasm;
    const __exports = {};
    
    
    let cachedEncoder = new TextEncoder('utf-8');
    
    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }
    
    function passStringToWasm(arg) {
        
        const buf = cachedEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        return [ptr, buf.length];
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
    
    function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        return [ptr, arg.length];
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
    /**
    * @returns {number}
    */
    __exports.prompt_new = function() {
        return wasm.prompt_new();
    };
    
    /**
    * @param {number} arg0
    * @returns {string}
    */
    __exports.prompt_print = function(arg0) {
        const retptr = globalArgumentPtr();
        wasm.prompt_print(retptr, arg0);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;
        
    };
    
    /**
    * @param {number} arg0
    * @param {string} arg1
    * @returns {string}
    */
    __exports.prompt_input = function(arg0, arg1) {
        const [ptr1, len1] = passStringToWasm(arg1);
        const retptr = globalArgumentPtr();
        wasm.prompt_input(retptr, arg0, ptr1, len1);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;
        
    };
    
    /**
    * @param {number} arg0
    * @returns {void}
    */
    __exports.prompt_free = function(arg0) {
        return wasm.prompt_free(arg0);
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

