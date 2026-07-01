# easy-confetti

Flexible, customisable canvas confetti animations for the web.

[![npm](https://img.shields.io/npm/v/easy-confetti.svg?colorB=brightgreen)](https://www.npmjs.com/package/easy-confetti)
[![NPM Downloads](https://img.shields.io/npm/dm/easy-confetti.svg?style=flat)](https://www.npmjs.com/package/easy-confetti)

[Demo](https://codepen.io/ux-ui/full/NWmaVKQ)

---

- Canvas-based confetti with front/back colour flip per particle.
- Configurable particle count, size range, speed, gravity, and palette.
- Sprinkles from a DOM anchor element (`#sprinkler`).
- `sprinkle()` on demand; `destroy()` tears down canvas and observers.

---

## Installation

```bash
npm install easy-confetti
```

## Quick Start

Add a sprinkler anchor in your markup, then create an instance:

```html
<div id="sprinkler"></div>
```

```ts
import EasyConfetti from 'easy-confetti';

const easyConfetti = new EasyConfetti();

easyConfetti.sprinkle();
```

The constructor appends a full-page canvas and starts the animation loop. Call `sprinkle()` to emit a burst of particles from the sprinkler position.

## Options

Pass a partial options object to the constructor:

```ts
const easyConfetti = new EasyConfetti({
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
  ],
});
```

| Option              | Type                                                    | Default                                                                            | Description                                                                 |
|:--------------------|:--------------------------------------------------------|:----------------------------------------------------------------------------------:|:----------------------------------------------------------------------------|
| `particleCount`     | `number`                                                | `70`                                                                               | Number of confetti particles per `sprinkle()` call.                         |
| `particleSizeRange` | `{ width: [number, number]; height: [number, number] }` | `{ width: [5, 20], height: [10, 18] }`                                             | Width and height range for each particle.                                   |
| `initialSpeed`      | `number`                                                | `25`                                                                               | Initial launch speed of particles.                                          |
| `gravity`           | `number`                                                | `0.65`                                                                             | Gravity applied each frame.                                                 |
| `airResistance`     | `number`                                                | `0.08`                                                                             | Air resistance factor.                                                      |
| `maxFallSpeed`      | `number`                                                | `6`                                                                                | Terminal fall speed cap.                                                    |
| `flipFrequency`     | `number`                                                | `0.017`                                                                            | Frequency of front/back colour flip.                                        |
| `colors`            | `Array<{ front: string; back: string }>`              | `[{ front: '#FF5733', back: '#C70039' }, { front: '#DAF7A6', back: '#FFC300' }]` | Colour pairs; particles flip between `front` and `back` while falling.      |

## Methods

```ts
easyConfetti.sprinkle();
easyConfetti.destroy();
```

- `sprinkle()` — emits one burst of particles from the `#sprinkler` element.
- `destroy()` — stops the animation loop, disconnects `ResizeObserver`, and removes the canvas.

### Repeated bursts

```ts
const sprinkleMultiple = (times: number, interval: number) => {
  let count = 0;

  const intervalId = setInterval(() => {
    easyConfetti.sprinkle();
    count++;

    if (count === times) {
      clearInterval(intervalId);
    }
  }, interval);
};
```

## Requirements

- A DOM element with `id="sprinkler"` must exist before constructing `EasyConfetti`.
- Browser APIs: `canvas`, `requestAnimationFrame`, `ResizeObserver`.

## License

MIT
