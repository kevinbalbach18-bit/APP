// PHP-Worker: führt Code isoliert aus, damit Endlosschleifen die Seite nicht einfrieren.
import './shim.mjs';
import { PhpWebBase } from '../node_modules/php-wasm/PhpWebBase.mjs';

class Php84 extends PhpWebBase {
  constructor(args = {}) {
    super(import('../node_modules/php-wasm/php8.4-web.mjs'), { version: '8.4', ...args });
  }
}

const wasmUrl = new URL('php84.wasm', self.location.href).href;
let php, out = '';

async function boot() {
  php = new Php84({
    autoTransaction: false,
    locateFile: (path) => (path.endsWith('.wasm') ? wasmUrl : undefined),
  });
  php.addEventListener('output', (e) => { out += e.detail.join(''); });
  php.addEventListener('error', (e) => { out += e.detail.join(''); });
  await php.binary;
  // Ini wie bei typischem Lern-Setup: alle Fehler anzeigen
  await php.run('<?php ini_set("display_errors","1"); error_reporting(E_ALL);');
}

const ready = boot().then(
  () => self.postMessage({ type: 'ready', version: '8.4' }),
  (err) => self.postMessage({ type: 'fatal', message: String(err && err.message || err) })
);

let chain = Promise.resolve();
self.onmessage = (ev) => {
  const { id, code } = ev.data || {};
  chain = chain.then(async () => {
    await ready;
    out = '';
    const t0 = performance.now();
    try {
      await php.refresh();
      await php.run(code);
    } catch (err) {
      out += '\nInterner Fehler: ' + String(err && err.message || err);
    }
    self.postMessage({ type: 'result', id, output: out, ms: Math.round(performance.now() - t0) });
  });
};
