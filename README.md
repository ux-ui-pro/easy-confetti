<br>
<p align="center"><strong>easy-confetti</strong></p>

<div align="center">

[![npm](https://img.shields.io/npm/v/easy-confetti.svg?colorB=brightgreen)](https://www.npmjs.com/package/easy-confetti)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/easy-confetti.svg)](https://github.com/ux-ui-pro/easy-confetti)
[![NPM Downloads](https://img.shields.io/npm/dm/easy-confetti.svg?style=flat)](https://www.npmjs.org/package/easy-confetti)

</div>

<p align="center">EasyConfetti is designed to create confetti animations and provides flexible, customisable confetti animations that can be easily integrated into a web page to create visual effects.</p>
<p align="center"><sup>1.5kB gzipped</sup></p>
<p align="center"><a href="https://codepen.io/ux-ui/full/NWmaVKQ">Demo</a></p>
<br>

&#10148; **Install**

```console
yarn add easy-confetti
```
<br>

&#10148; **Import**

```javascript
import EasyConfetti from 'easy-confetti';
```
<br>

&#10148; **Usage**

```javascript
const easyConfetti = new EasyConfetti();

easyConfetti.init();
```
<br>
Initialization with specified parameters
<br>

```javascript
const confettiParams = {
  particleCount: 70,
  particleSizeRange: {
    width: [5, 20],
    height: [10, 18],
  },
  initialSpeed: 25,
  gravity: 0.65,
  airResistance: 0.08,
  maxFallSpeed: 6,
  flipFrequency: 0.017,
  colors: [
    { front: '#4C9E14', back: '#30610A' },
    { front: '#CC7600', back: '#874900' },
    { front: '#FF4E44', back: '#AA302B' },
    { front: '#E6427E', back: '#933155' },
    { front: '#7D61A1', back: '#49306C' },
    { front: '#4A5F9A', back: '#2A3B5C' },
    { front: '#00A3A3', back: '#006969' },
  ],
};

const easyConfetti = new EasyConfetti(confettiParams);

easyConfetti.init();
```
<br>
Triggering the animation multiple times with a specified interval
<br>

```javascript
const sprinkleMultiple = (times, interval) => {
  Array.from({ length: times }).forEach((_, i) => {
    setTimeout(() => {
      easyConfetti.sprink();
    }, i * interval);
  });
};
```
<br>

&#10148; **Parameters**

| Option              |                          Type                           |                                      Default                                       | Description                                                                                                                          |
|:--------------------|:-------------------------------------------------------:|:----------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------|
| `particleCount`     |                        `number`                         |                                        `70`                                        | This parameter determines the number of confetti particles to be generated.                                                          |
| `particleSizeRange` | `{ width: [number, number], height: [number, number] }` |                       `{ width: [5, 20], height: [10, 18] }`                       | This parameter sets the range for the width and height of the confetti particles.                                                    |
| `initialSpeed`      |                        `number`                         |                                        `25`                                        | This parameter defines the initial speed at which the confetti particles are launched.                                               |
| `gravity`           |                        `number`                         |                                       `0.65`                                       | This parameter sets the gravity effect on the confetti particles, influencing how quickly they fall.                                 |
| `airResistance`     |                        `number`                         |                                       `0.08`                                       | This parameter determines the air resistance effect on the confetti particles, affecting how quickly they decelerate.                |
| `maxFallSpeed`      |                        `number`                         |                                        `6`                                         | This parameter sets the maximum fall speed of the confetti particles.                                                                |
| `flipFrequency`     |                        `number`                         |                                      `0.017`                                       | This parameter defines the frequency of the confetti particles flipping between their front and back colors.                         |
| `colors`            |        `Array<{ front: string, back: string }>`         | `[ { front: '#FF5733', back: '#C70039' }, { front: '#DAF7A6', back: '#FFC300' } ]` | This parameter is an array of color pairs for the confetti particles, where each particle can flip between a front and a back color. |
<br>

&#10148; **License**

easy-confetti is released under MIT license
