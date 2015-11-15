require('babel/polyfill');

let commonTimeout = 60000;

export function changeGlobalTimeout(value) {
  commonTimeout = value;
}

function assert(fn, message) {
  if (!fn()) {
    throw new Error(message);
  }
}

function nothing() {}

function actualNode(node) {
  return (typeof node === 'string') ? document.querySelector(node) : node;
}

export function animateElement(selector, className, options = {}) {
  setTimeout(() => {
    let cleanedUp = false;
    const { before, after, timeout } = options;
    const node = actualNode(selector);
    const classNames = Array.isArray(className) ? className : [className];
    function hideAfterAnimation() {
      if (cleanedUp) {
        return;
      }
      cleanedUp = true;
      node.removeEventListener('animationend', hideAfterAnimation, false);
      classNames.forEach(cn => node.classList.toggle(cn));
      if (after) {
        try {
          after(node);
        } catch (e) {
          console.error(e);
        }
      }
    }
    if (before) {
      try {
        before(node);
      } catch (e) {
        console.error(e);
      }
    }
    node.addEventListener('animationend', hideAfterAnimation, false);
    classNames.forEach(cn => node.classList.toggle(cn));
    setTimeout(hideAfterAnimation, timeout || commonTimeout);
  }, 0);
}

export function animateElements(selector, className, options = {}) {
  const { beforeAll, afterAll, beforeItem, afterItem, timeout } = options;
  const classNames = Array.isArray(className) ? className : [className];
  assert(() => timeout, 'Timeout value is required to remove animation class');
  const nodes = (Array.isArray(selector) || (selector instanceof NodeList)) ?
      selector : [].slice.call(document.querySelectorAll(selector));
  const length = nodes.length;
  let counter = 0;
  if (beforeAll) {
    try {
      beforeAll(nodes);
    } catch (e) {
      console.error(e);
    }
  }
  nodes.forEach(n => animateElement(n, classNames, { timeout, before: beforeItem, after: node => {
    if (afterItem) {
      try {
        afterItem(node);
      } catch (e) {
        console.error(e);
      }
    }
    counter = counter + 1;
    if (counter === length) {
      if (afterAll) {
        try {
          afterAll(nodes);
        } catch (ex) {
          console.error(ex);
        }
      }
    }
  }}));
}

export function animate(node, className, timeout, cb = nothing) {
  assert(() => timeout, 'Timeout value is required to remove animation class');
  animateElement(node, className, { before: nothing, after: cb, timeout });
}

export function hide(node, className, timeout, cb = nothing) {
  assert(() => timeout, 'Timeout value is required to remove animation class');
  animateElement(node, className, {
    timeout,
    before: nothing,
    after: n => {
      n.style.display = 'none';
      if (cb) {
        try {
          cb();
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
}

export function show(n, className, timeout, displayArg, cbArg) {
  assert(() => timeout, 'Timeout value is required to remove animation class');
  let display = displayArg;
  let cb = cbArg;
  const node = actualNode(n);
  if (typeof display === 'function') {
    cb = display;
    display = 'block';
  }
  animateElement(node, className, {
    timeout,
    before: theNode => {
      theNode.style.display = display || 'block';
    },
    after: cb
  });
}
