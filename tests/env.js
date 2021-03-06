/* eslint no-console: 0 */

import jsdom from 'jsdom';

export function bootstrap(body = '') {
  const doc = jsdom.jsdom(`<!doctype html><html><body>${body}</body></html>`);
  const win = doc.defaultView;
  function propagateToGlobal(window) {
    for (const key in window) {
      if (!window.hasOwnProperty(key)) continue; // eslint-disable-line
      if (key in global) continue; // eslint-disable-line
      global[key] = window[key];
    }
  }
  global.document = doc;
  global.window = win;
  propagateToGlobal(win);
  console.log('\nENV setup is done !!!');
}
