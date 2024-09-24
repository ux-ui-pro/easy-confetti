import ConfettiElement from './ConfettiElement.ts';

class EasyConfetti {
  private confetti: HTMLCanvasElement;

  private confettiCtx: CanvasRenderingContext2D;

  private container: { w: number; h: number };

  private confettiElements: ConfettiElement[] = [];

  private sprinkler: HTMLElement;

  private confettiParams: ConfettiParams;

  private devicePixelRatio: number;

  private animationFrameId: number | null = null;

  private resizeObserver: ResizeObserver;

  constructor(params: Partial<ConfettiParams> = {}) {
    this.confetti = document.createElement('canvas');
    this.confetti.id = 'easy-confetti';
    document.body.appendChild(this.confetti);

    const context = this.confetti.getContext('2d');
    if (!context) {
      throw new Error('Canvas context not available');
    }
    this.confettiCtx = context;

    this.container = { w: 0, h: 0 };
    this.sprinkler = document.getElementById('sprinkler') as HTMLElement;
    if (!this.sprinkler) {
      throw new Error('Element with id "sprinkler" not found');
    }

    this.devicePixelRatio = window.devicePixelRatio || 1;

    this.confettiParams = {
      particleCount: params.particleCount ?? 70,
      particleSizeRange: params.particleSizeRange ?? { width: [5, 20], height: [10, 18] },
      initialSpeed: params.initialSpeed ?? 25,
      gravity: params.gravity ?? 0.65,
      airResistance: params.airResistance ?? 0.08,
      maxFallSpeed: params.maxFallSpeed ?? 6,
      flipFrequency: params.flipFrequency ?? 0.017,
      colors: params.colors ?? [
        { front: '#FF5733', back: '#C70039' },
        { front: '#DAF7A6', back: '#FFC300' },
      ],
    };

    this.init();
  }

  private static rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private setupCanvas(): void {
    const rect = this.confetti.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    this.container = { w, h };
    this.confetti.width = w * this.devicePixelRatio;
    this.confetti.height = h * this.devicePixelRatio;
    this.confettiCtx.scale(this.devicePixelRatio, this.devicePixelRatio);
  }

  private updateConfetti = (): void => {
    const { w, h } = this.container;

    this.confettiCtx.clearRect(0, 0, w, h);

    this.confettiElements.forEach((c) => {
      c.update();

      this.confettiCtx.save();
      this.confettiCtx.translate(c.position.x, c.position.y);
      this.confettiCtx.rotate(c.rotation);

      const width = c.dimensions.width * c.scale.x;
      const height = c.dimensions.height * c.scale.y;

      this.confettiCtx.fillStyle = c.color;
      this.confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
      this.confettiCtx.restore();
    });

    this.confettiElements = this.confettiElements.filter(
      (c) => c.position.y <= h && c.position.x > -0.5 * w && c.position.x < 1.5 * w,
    );

    this.animationFrameId = requestAnimationFrame(this.updateConfetti);
  };

  private addConfetti(): void {
    const {
      left, top, width, height,
    } = this.sprinkler.getBoundingClientRect();
    const confettiRect = this.confetti.getBoundingClientRect();

    const clickPosition = {
      x: left + width / 2 - confettiRect.left,
      y: top + height / 2 - confettiRect.top,
    };

    this.confettiElements.push(
      ...Array.from({ length: this.confettiParams.particleCount }, () => this.createConfettiElement(clickPosition)),
    );
  }

  private createConfettiElement(position: Position): ConfettiElement {
    const {
      particleSizeRange,
      initialSpeed,
      flipFrequency,
      maxFallSpeed,
      colors,
    } = this.confettiParams;

    const randomModifier = EasyConfetti.rand(-1, 1);
    const colorPair = colors[Math.floor(EasyConfetti.rand(0, colors.length))];

    const dimensions = {
      width: EasyConfetti.rand(particleSizeRange.width[0], particleSizeRange.width[1]),
      height: EasyConfetti.rand(particleSizeRange.height[0], particleSizeRange.height[1]),
    };

    const velocity = {
      x: EasyConfetti.rand(-initialSpeed, initialSpeed) * 0.4,
      y: EasyConfetti.rand(-initialSpeed, initialSpeed),
    };

    const flipSpeed = EasyConfetti.rand(0.2, 1.5) * flipFrequency;
    const terminalVelocity = EasyConfetti.rand(1, 1.5) * maxFallSpeed;

    if (position.y <= this.container.h) {
      velocity.y = -Math.abs(velocity.y);
    }

    return new ConfettiElement(
      position,
      this.confettiParams,
      randomModifier,
      colorPair,
      dimensions,
      velocity,
      flipSpeed,
      terminalVelocity,
    );
  }

  private hideConfetti(): void {
    this.confettiElements = [];
  }

  public init(): void {
    this.setupCanvas();
    this.updateConfetti();

    this.resizeObserver = new ResizeObserver(() => {
      this.setupCanvas();
    });

    this.resizeObserver.observe(this.confetti);
  }

  public destroy(): void {
    this.resizeObserver.unobserve(this.confetti);
    this.hideConfetti();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    document.body.removeChild(this.confetti);
  }

  public sprinkle = (): void => {
    this.addConfetti();
  };
}

export default EasyConfetti;
