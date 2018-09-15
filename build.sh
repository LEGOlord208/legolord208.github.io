#!/usr/bin/env nix-shell
#!nix-shell -i sh -p python3

set -e
pushd wasm/
    cargo build --target wasm32-unknown-unknown --release
popd
wasm-bindgen wasm/target/wasm32-unknown-unknown/release/wasm.wasm --out-dir . --no-modules

python3 -m http.server
