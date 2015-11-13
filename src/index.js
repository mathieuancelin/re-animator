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

export function animateElements(selector, classNames, options = {}) {
  let cleanedUp = false;
  const { beforeAll, afterAll, beforeItem, afterItem, timeout } = options;

  assert(() => Array.isArray(classNames), 'ClassNames should be an array of HtmlElement or a NodeList');
  assert(() => timeout, 'Timeout value is required to remove animation class');

  const nodes = (Array.isArray(selector) || (selector instanceof NodeList)) ? selector : [].slice.call(document.querySelectorAll(selector));
  const length = nodes.length;
  let counter = 0;

  function decrementAndTrigger() {
    counter = counter + 1;
    if (afterAll && counter === length) {
      afterAll(nodes);
      cleanedUp = true;
      counter = counter + 999;
    }
  }

  function itemAnimationEnd(e) {
    if (cleanedUp) {
      return;
    }
    const node = e.target;
    node.removeEventListener('animationend', itemAnimationEnd, false);
    classNames.forEach(className => node.classList.toggle(className));
    if (afterItem) {
      try {
        afterItem(node);
      } catch (ex) {
        console.error(ex);
      }
    }
    decrementAndTrigger();
  }

  if (beforeAll) {
    try {
      beforeAll(nodes);
    } catch (e) {
      console.error(e);
    }
  }

  nodes.forEach(node => {
    if (beforeItem) {
      beforeItem(node);
    }
    node.addEventListener('animationend', itemAnimationEnd, false);
    classNames.forEach(className => node.classList.toggle(className));
  });
  setTimeout(() => nodes.forEach(node => itemAnimationEnd({ target: node })), timeout || commonTimeout);
}

export function animateElement(selector, className, options = {}) {
  const { before, after, timeout } = options;
  const node = actualNode(selector);
  const classNames = Array.isArray(className) ? className : [className];
  animateElements([node], classNames, { beforeItem: before, afterItem: after, timeout });
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
