Re-Animator
----------------------


Re-Animator is a simple library to animation DOM nodes using CSS3 animations.

The API is the following :

* `changeGlobalTimeout(value)` : change the global timeout after which animation are ended no matter what
* `hide(node: string || Node, cssClass: array[string] || string, timeout: int, callback: function)` : hides a dom node after animation end
* `show(node: string || Node, cssClass: array[string] || string, timeout: int, callback: function)` : shows a dom node after animation end
* `animate(node: string || Node, cssClass: array[string] || string, timeout: int, callback: function)` : animate a dom node
* `animateElement(node: string || Node, cssClass: array[string] || string, options: object)` : animate a dom node
* `animateElements(node: string || Node, cssClass: array[string], options: object)` : animate dom nodes

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

ReAnimator.hide('#part', 'fade-out', function() {
  console.log('done');
});

ReAnimator.show('#part', 'fade-in', function() {
  console.log('done');
});

ReAnimator.animate('#part', 'scale', function() {
  console.log('done');
});
```
