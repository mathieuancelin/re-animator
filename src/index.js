require('babel/polyfill');

let commonTimeout = 60000;

export function changeGlobalTimeout(value) {
  commonTimeout = value;
}

function nothing() {}

function actualNode(node) {
  return (typeof node === 'string') ? document.querySelector(node) : node;
}

export function animateElements(selector, className, options = {}) {
  let cleanedUp = false;
  const { beforeAll, afterAll, beforeItem, afterItem, timeout } = options;
  const nodes = [].slice.call(document.querySelectorAll(selector));
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
    node.classList.toggle(className);
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
    node.classList.toggle(className);
  });
  setTimeout(() => nodes.forEach(node => itemAnimationEnd({ target: node })), timeout || commonTimeout);
}

export function animateElement(selector, className, options = {}) {
  let cleanedUp = false;
  const { before, after, timeout } = options;
  const node = actualNode(selector);
  function hideAfterAnimation() {
    if (cleanedUp) {
      return;
    }
    cleanedUp = true;
    node.removeEventListener('animationend', hideAfterAnimation, false);
    node.classList.toggle(className);
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
  node.classList.toggle(className);
  setTimeout(hideAfterAnimation, timeout || commonTimeout);
}

export function animate(node, className, cb = nothing) {
  animateElement(node, className, { before: nothing, after: cb });
}

export function hide(node, className, cb = nothing) {
  animateElement(node, className, {
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

export function show(n, className, displayArg, cbArg) {
  let display = displayArg;
  let cb = cbArg;
  const node = actualNode(n);
  if (typeof display === 'function') {
    cb = display;
    display = 'block';
  }
  animateElement(node, className, {
    before: theNode => {
      theNode.style.display = display || 'block';
    },
    after: cb
  });
}
