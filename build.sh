#!/bin/sh
# Baut die fertige Webseite nach dist/
set -eu
rm -rf dist
mkdir -p dist/lizenzen
cp site/index.html site/lessons.js site/checker.js dist/
npx esbuild src/cm-entry.mjs --bundle --format=esm --minify --outfile=dist/editor.js
npx esbuild src/worker-entry.mjs --bundle --format=esm --minify --outfile=dist/php-worker.js
# Die WebAssembly-Datei von PHP 8.4 heißt im Paket nach ihrem Hash
WASM=$(grep -o '[0-9a-f]\{40\}\.wasm' node_modules/php-wasm/php8.4-web.mjs | head -n 1)
cp "node_modules/php-wasm/$WASM" dist/php84.wasm
cp node_modules/php-wasm/LICENSE dist/lizenzen/php-wasm-LICENSE.txt
cp node_modules/php-wasm/NOTICE dist/lizenzen/php-wasm-NOTICE.txt
cp node_modules/@codemirror/view/LICENSE dist/lizenzen/codemirror-LICENSE.txt
touch dist/.nojekyll
echo "Fertig: $(ls dist | wc -l) Dateien in dist/"
