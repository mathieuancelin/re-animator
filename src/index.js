require('babel-polyfill');

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

function safe(func) {
  return (arg) => {
    if (func) {
      try {
        return func(arg);
      } catch (e) {
        console.error(e);
      }
    }
  };
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
      safe(after)(node);
    }
    safe(before)(node);
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
  safe(beforeAll)(nodes);
  nodes.forEach(n => animateElement(n, classNames, { timeout, before: beforeItem, after: node => {
    safe(afterItem)(node);
    counter = counter + 1;
    if (counter === length) {
      safe(afterAll)(nodes);
    }
  } }));
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
      n.style.display = 'none'; // eslint-disable-line
      safe(cb)();
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
      theNode.style.display = display || 'block'; // eslint-disable-line
    },
    after: cb
  });
}

export function transition(selector, baseName, options) {
  const { before, after, timeout } = options;
  let nodes = [];
  if (selector instanceof HTMLElement) {
    nodes = [selector];
  } else if (selector instanceof Element) {
    nodes = [selector];
  } else if (Array.isArray(selector) && selector.length > 0 && selector[0] instanceof HTMLElement) {
    nodes = selector;
  } else if (selector instanceof NodeList) {
    nodes = [].slice.call(selector);
  } else if (typeof selector === 'string') {
    nodes = [].slice.call(document.querySelectorAll(selector));
  } else {
    throw new Error('Unknown selector', selector);
  }
  assert(() => timeout, 'Timeout value is required to remove animation class');
  nodes.forEach(node => {
    safe(before)(node);
    node.classList.toggle(baseName);
    setTimeout(() => {
      node.classList.toggle(`${baseName}-active`);
      setTimeout(() => {
        node.classList.toggle(baseName);
        node.classList.toggle(`${baseName}-active`);
        safe(after)(node);
      }, timeout);
    }, 1);
  });
}
