// Minimaler DOM-Ersatz: der Web-Build von php-wasm erwartet ein document, auch im Worker.
const noop = () => {};
if (typeof self.document === 'undefined') {
  self.document = {
    title: '', hidden: false, visibilityState: 'visible', body: null, documentElement: null,
    currentScript: null, styleSheets: [],
    addEventListener: noop, removeEventListener: noop,
    querySelector: () => null, getElementById: () => null,
    createElement: () => ({ style: {}, addEventListener: noop, getContext: () => null }),
  };
}
if (typeof self.window === 'undefined') self.window = self;
