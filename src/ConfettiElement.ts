interface ColorPair {
  front: string;
  back: string;
}

interface ConfettiParams {
  particleCount: number;
  particleSizeRange: { width: [number, number]; height: [number, number] };
  initialSpeed: number;
  gravity: number;
  airResistance: number;
  maxFallSpeed: number;
  flipFrequency: number;
  colors: ColorPair[];
}

interface Position {
  x: number;
  y: number;
}

class ConfettiElement {
  randomModifier: number;

  colorPair: ColorPair;

  dimensions: { width: number; height: number };

  position: Position;

  rotation: number;

  scale: { x: number; y: number };

  velocity: { x: number; y: number };

  flipSpeed: number;

  terminalVelocity: number;

  color: string;

  airResistance: number;

  gravity: number;

  constructor(
    position: Position,
    confettiParams: ConfettiParams,
    randomModifier: number,
    colorPair: ColorPair,
    dimensions: { width: number; height: number },
    velocity: { x: number; y: number },
    flipSpeed: number,
    terminalVelocity: number,
  ) {
    this.randomModifier = randomModifier;
    this.colorPair = colorPair;
    this.dimensions = dimensions;
    this.position = { ...position };
    this.rotation = Math.random() * 2 * Math.PI;
    this.scale = { x: 1, y: 1 };
    this.velocity = velocity;
    this.flipSpeed = flipSpeed;
    this.terminalVelocity = terminalVelocity;
    this.color = '';
    this.airResistance = confettiParams.airResistance;
    this.gravity = confettiParams.gravity;
  }

  update(): void {
    this.velocity.x *= 0.98;
    this.position.x += this.velocity.x;
    this.velocity.y += this.randomModifier * this.airResistance;
    this.velocity.y += this.gravity;
    this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
    this.position.y += this.velocity.y;
    this.scale.y = Math.cos((this.position.y + this.randomModifier) * this.flipSpeed);
    this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
  }
}

export default ConfettiElement;
