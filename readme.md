Re-Animator
----------------------

[![build status][1]][2]
[![NPM version][3]][4]
[![Dependency status][7]][8]
[![Dev Dependency status][11]][12]
[![Downloads][9]][10]

Re-Animator is a simple library to animation DOM nodes using CSS3 animations. The global namespace in non commonJS env is `ReAnimator` and import the script from npmcdn :

```html
<script src="https://npmcdn.com/re-animator/dist/re-animator.js"></script>
```

The API is the following :

* `changeGlobalTimeout(value)` : change the global timeout after which animation are ended no matter what
* `hide(node: string, cssClass: string, timeout: int, callback: function)` : hides a dom node after animation end
* `show(node: string, cssClass: string, timeout: int, [display]: string, callback: function)` : shows a dom node after animation end
* `animate(node: string, cssClass: string, timeout: int, callback: function)` : animate a dom node
* `animateElement(node: string, cssClass: string, options: object)` : animate a dom node
* `animateElements(nodes: string, cssClass: string, options: object)` : animate dom nodes
* `transition(nodes: string, baseClass: string, options: object)` : add baseClass class to nodes and in the next tick add `${baseClass}-active` to trigger animation. Use options timeout to remove both classes.

`node` arguments can be string (querySelector) or HtmlElement.
`nodes` arguments can be string (querySelectorAll) or NodeList.
`cssClass` arguments can be string or array of string.

options on `animateElement` are :

* `before` : callback before the start of the animation
* `after`: callback after the end of the animation
* `timeout` : after the timeout, css class will be remove from the node even if the animation is not done or did not even happens.

options on `animateElements` are :

* `beforeAll` : callback before the start of the animation of every node
* `afterAll` : callback after the end of the animation of every node
* `beforeItem` : callback before the start of the animation of each node
* `afterItem` : callback after the end of the animation for each node
* `timeout` : after the timeout, css class will be remove from the nodes even if the animation is not done or did not even happens.

Example
========

```css
@keyframes loop {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
.loop {
  animation: loop 1s;
  animation-iteration-count: 5;
}
@keyframes fadeout {
  0% {
    opacity: 1.0;
  }
  100% {
    opacity: 0.0;
  }
}
.fadeout {
  animation-name: fadeout;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}
@keyframes fadein {
  0% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}
.fadein {
  animation-name: fadein;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}
@keyframes scale {
  0% {
    width: 50px;
  }
  100% {
    width: 100px;
  }
}
.scale {
  animation-name: scale;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
}
```

```html
<div style="display: flex; flex-direction: column">
  <div style="padding: 50px 50px 50px 50px">
    <div id="part" style="width: 50px; height: 50px; background-color: blue"></div>
  </div>
  <div style="padding: 50px 50px 50px 50px; display: flex; flex-direction: column">
    <div class="parts" style="margin-bottom: 10px; width: 50px; height: 50px; background-color: red"></div>
    <div class="parts" style="margin-bottom: 10px; width: 50px; height: 50px; background-color: red"></div>
    <div class="parts" style="margin-bottom: 10px; width: 50px; height: 50px; background-color: red"></div>
  </div>
</div>
```

```javascript
ReAnimator.animateElement('#part', 'loop', { timeout: 6000 });

ReAnimator.animateElements('.parts', 'loop', { timeout: 6000 });

ReAnimator.hide('#part', 'fade-out', 1000, function() {
  console.log('done');
});

ReAnimator.show('#part', 'fade-in', 1000, function() {
  console.log('done');
});

ReAnimator.animate('#part', 'scale', 1000, function() {
  console.log('done');
});
```


[1]: https://api.travis-ci.org/mathieuancelin/re-animator.svg
[2]: https://api.travis-ci.org/mathieuancelin/re-animator
[3]: https://badge.fury.io/js/re-animator.svg
[4]: https://badge.fury.io/js/re-animator
[7]: https://david-dm.org/mathieuancelin/re-animator.svg
[8]: https://david-dm.org/mathieuancelin/re-animator
[9]: https://img.shields.io/npm/dm/re-animator.svg
[10]: https://www.npmjs.com/package/re-animator
[11]: https://img.shields.io/david/dev/mathieuancelin/re-animator.svg
[12]: https://david-dm.org/mathieuancelin/re-animator#info=devDependencies&view=table
