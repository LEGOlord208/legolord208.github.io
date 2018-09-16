
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
    
    const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];
    
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
    
    const __wbg_call_99e981b05e14efcd_target = Function.prototype.call || function() {
        throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
    };
    
    const stack = [];
    
    function getObject(idx) {
        if ((idx & 1) === 1) {
            return stack[idx >> 1];
        } else {
            const val = slab[idx >> 1];
            
            return val.obj;
            
        }
    }
    
    __exports.__wbg_call_99e981b05e14efcd = function(arg0, arg1, arg2, exnptr) {
        try {
            return addHeapObject(__wbg_call_99e981b05e14efcd_target.call(getObject(arg0), getObject(arg1), getObject(arg2)));
        } catch (e) {
            const view = getUint32Memory();
            view[exnptr / 4] = 1;
            view[exnptr / 4 + 1] = addHeapObject(e);
            
        }
    };
    
    function freeMoveResult(ptr) {
        
        wasm.__wbg_moveresult_free(ptr);
    }
    /**
    */
    class MoveResult {
        
        static __construct(ptr) {
            return new MoveResult(ptr);
        }
        
        constructor(ptr) {
            this.ptr = ptr;
            
        }
        
        /**
        * @returns {boolean}
        */
        get success() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return (wasm.__wbg_get_moveresult_success(this.ptr)) !== 0;
        }
        set success(arg0) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return wasm.__wbg_set_moveresult_success(this.ptr, arg0 ? 1 : 0);
        }
        free() {
            const ptr = this.ptr;
            this.ptr = 0;
            freeMoveResult(ptr);
        }
        /**
        * @returns {string}
        */
        from() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const retptr = globalArgumentPtr();
            wasm.moveresult_from(retptr, this.ptr);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];
            
            const realRet = getStringFromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;
            
        }
        /**
        * @returns {string}
        */
        to() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const retptr = globalArgumentPtr();
            wasm.moveresult_to(retptr, this.ptr);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];
            
            const realRet = getStringFromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;
            
        }
    }
    __exports.MoveResult = MoveResult;
    
    class ConstructorToken {
        constructor(ptr) {
            this.ptr = ptr;
        }
    }
    
    function freeChessTerm(ptr) {
        
        wasm.__wbg_chessterm_free(ptr);
    }
    /**
    */
    class ChessTerm {
        
        static __construct(ptr) {
            return new ChessTerm(new ConstructorToken(ptr));
        }
        
        constructor(...args) {
            if (args.length === 1 && args[0] instanceof ConstructorToken) {
                this.ptr = args[0].ptr;
                return;
            }
            
            // This invocation of new will call this constructor with a ConstructorToken
            let instance = ChessTerm.new(...args);
            this.ptr = instance.ptr;
            
        }
        free() {
            const ptr = this.ptr;
            this.ptr = 0;
            freeChessTerm(ptr);
        }
        /**
        * @param {any} arg0
        * @returns {ChessTerm}
        */
        static new(arg0) {
            return ChessTerm.__construct(wasm.chessterm_new(addHeapObject(arg0)));
        }
        /**
        * @returns {void}
        */
        draw() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return wasm.chessterm_draw(this.ptr);
        }
        /**
        * @param {string} arg0
        * @returns {void}
        */
        command(arg0) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const [ptr0, len0] = passStringToWasm(arg0);
            try {
                return wasm.chessterm_command(this.ptr, ptr0, len0);
                
            } finally {
                wasm.__wbindgen_free(ptr0, len0 * 1);
                
            }
            
        }
    }
    __exports.ChessTerm = ChessTerm;
    
    function freeCanMove(ptr) {
        
        wasm.__wbg_canmove_free(ptr);
    }
    /**
    */
    class CanMove {
        
        static __construct(ptr) {
            return new CanMove(ptr);
        }
        
        constructor(ptr) {
            this.ptr = ptr;
            
        }
        
        /**
        * @returns {boolean}
        */
        get illegal() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return (wasm.__wbg_get_canmove_illegal(this.ptr)) !== 0;
        }
        set illegal(arg0) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return wasm.__wbg_set_canmove_illegal(this.ptr, arg0 ? 1 : 0);
        }
        free() {
            const ptr = this.ptr;
            this.ptr = 0;
            freeCanMove(ptr);
        }
        /**
        * @returns {string}
        */
        check() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
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
    
    function freeChessBoard(ptr) {
        
        wasm.__wbg_chessboard_free(ptr);
    }
    /**
    */
    class ChessBoard {
        
        static __construct(ptr) {
            return new ChessBoard(new ConstructorToken(ptr));
        }
        
        constructor(...args) {
            if (args.length === 1 && args[0] instanceof ConstructorToken) {
                this.ptr = args[0].ptr;
                return;
            }
            
            // This invocation of new will call this constructor with a ConstructorToken
            let instance = ChessBoard.new(...args);
            this.ptr = instance.ptr;
            
        }
        free() {
            const ptr = this.ptr;
            this.ptr = 0;
            freeChessBoard(ptr);
        }
        /**
        * @returns {ChessBoard}
        */
        static new() {
            return ChessBoard.__construct(wasm.chessboard_new());
        }
        /**
        * @param {string} arg0
        * @param {string} arg1
        * @returns {CanMove}
        */
        can_move(arg0, arg1) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const [ptr0, len0] = passStringToWasm(arg0);
            const [ptr1, len1] = passStringToWasm(arg1);
            try {
                return CanMove.__construct(wasm.chessboard_can_move(this.ptr, ptr0, len0, ptr1, len1));
                
            } finally {
                wasm.__wbindgen_free(ptr0, len0 * 1);
                wasm.__wbindgen_free(ptr1, len1 * 1);
                
            }
            
        }
        /**
        * @returns {MoveResult}
        */
        get_move() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return MoveResult.__construct(wasm.chessboard_get_move(this.ptr));
        }
    }
    __exports.ChessBoard = ChessBoard;
    
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
    
    __exports.__wbindgen_string_new = function(p, l) {
        return addHeapObject(getStringFromWasm(p, l));
    };
    
    __exports.__wbindgen_number_get = function(n, invalid) {
        let obj = getObject(n);
        if (typeof(obj) === 'number') return obj;
        getUint8Memory()[invalid] = 1;
        return 0;
    };
    
    __exports.__wbindgen_is_null = function(idx) {
        return getObject(idx) === null ? 1 : 0;
    };
    
    __exports.__wbindgen_is_undefined = function(idx) {
        return getObject(idx) === undefined ? 1 : 0;
    };
    
    __exports.__wbindgen_boolean_get = function(i) {
        let v = getObject(i);
        if (typeof(v) === 'boolean') {
            return v ? 1 : 0;
        } else {
            return 2;
        }
    };
    
    __exports.__wbindgen_is_symbol = function(i) {
        return typeof(getObject(i)) === 'symbol' ? 1 : 0;
    };
    
    __exports.__wbindgen_string_get = function(i, len_ptr) {
        let obj = getObject(i);
        if (typeof(obj) !== 'string') return 0;
        const [ptr, len] = passStringToWasm(obj);
        getUint32Memory()[len_ptr / 4] = len;
        return ptr;
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

