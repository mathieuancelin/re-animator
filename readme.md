Re-Animator
----------------------


Re-Animator is a simple library to animation DOM nodes using CSS3 animations.

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

ReAnimator.hide('#part', 'fade-out', { timeout: 2000 });

ReAnimator.show('#part', 'fade-in', { timeout: 2000 });
```
