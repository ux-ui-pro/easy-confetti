
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $ff65987f6c0f34dd$export$2e2bcd8739ae039; });
class $ff65987f6c0f34dd$var$EasyConfetti {
    #confetti;
    #confettiCtx;
    #container;
    #confettiElements;
    #sprinkler;
    #confettiParams;
    #colors;
    #devicePixelRatio;
    constructor(params = {}){
        this.#confetti = document.createElement("canvas");
        this.#confetti.id = "easy-confetti";
        document.body.appendChild(this.#confetti);
        this.#confettiCtx = this.#confetti.getContext("2d");
        this.#container = null;
        this.#confettiElements = [];
        this.#sprinkler = document.getElementById("sprinkler");
        this.#devicePixelRatio = window.devicePixelRatio || 1;
        this.#confettiParams = {
            particleCount: params.particleCount || 70,
            particleSizeRange: params.particleSizeRange || {
                width: [
                    5,
                    20
                ],
                height: [
                    10,
                    18
                ]
            },
            initialSpeed: params.initialSpeed || 25,
            gravity: params.gravity || 0.65,
            airResistance: params.airResistance || 0.08,
            maxFallSpeed: params.maxFallSpeed || 6,
            flipFrequency: params.flipFrequency || 0.017,
            colors: params.colors || [
                {
                    front: "#FF5733",
                    back: "#C70039"
                },
                {
                    front: "#DAF7A6",
                    back: "#FFC300"
                }
            ]
        };
        this.#colors = this.#confettiParams.colors;
    }
    // eslint-disable-next-line class-methods-use-this
    #rand = (min, max)=>Math.random() * (max - min) + min;
    #setupCanvas = ()=>{
        const { clientWidth: w, clientHeight: h } = document.documentElement;
        this.#container = {
            w: w,
            h: h
        };
        this.#confetti.width = w * this.#devicePixelRatio;
        this.#confetti.height = h * this.#devicePixelRatio;
        this.#confetti.style.width = `${w}px`;
        this.#confetti.style.height = `${h}px`;
        this.#confettiCtx.scale(this.#devicePixelRatio, this.#devicePixelRatio);
    };
    #updateConfetti = ()=>{
        const { w: w, h: h } = this.#container;
        this.#confettiCtx.clearRect(0, 0, w, h);
        this.#confettiElements.forEach((c)=>{
            c.update();
            this.#confettiCtx.save();
            this.#confettiCtx.translate(c.position.x, c.position.y);
            this.#confettiCtx.rotate(c.rotation);
            const width = c.dimensions.width * c.scale.x;
            const height = c.dimensions.height * c.scale.y;
            this.#confettiCtx.fillStyle = c.color;
            this.#confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
            this.#confettiCtx.restore();
        });
        this.#confettiElements = this.#confettiElements.filter((c)=>c.position.y <= h && c.position.x > -0.5 * w && c.position.x < 1.5 * w);
        requestAnimationFrame(this.#updateConfetti);
    };
    #addConfetti = ()=>{
        const { left: left, top: top, width: width, height: height } = this.#sprinkler.getBoundingClientRect();
        const clickPosition = [
            left + width / 2,
            top + height / 2
        ];
        this.#confettiElements.push(...Array.from({
            length: this.#confettiParams.particleCount
        }, ()=>this.#createConfettiElement(clickPosition)));
    };
    #createConfettiElement = (clickPosition)=>{
        const { particleSizeRange: particleSizeRange, initialSpeed: initialSpeed, flipFrequency: flipFrequency, maxFallSpeed: maxFallSpeed, airResistance: airResistance, gravity: gravity } = this.#confettiParams;
        const randomModifier = this.#rand(-1, 1);
        const colorPair = this.#colors[Math.floor(this.#rand(0, this.#colors.length))];
        const dimensions = {
            width: this.#rand(particleSizeRange.width[0], particleSizeRange.width[1]),
            height: this.#rand(particleSizeRange.height[0], particleSizeRange.height[1])
        };
        const position = {
            x: clickPosition[0],
            y: clickPosition[1]
        };
        const rotation = this.#rand(0, 2 * Math.PI);
        const scale = {
            x: 1,
            y: 1
        };
        const velocity = {
            x: this.#rand(-initialSpeed, initialSpeed) * 0.4,
            y: this.#rand(-initialSpeed, initialSpeed)
        };
        const flipSpeed = this.#rand(0.2, 1.5) * flipFrequency;
        const terminalVelocity = this.#rand(1, 1.5) * maxFallSpeed;
        if (position.y <= this.#container.h) velocity.y = -Math.abs(velocity.y);
        return {
            randomModifier: randomModifier,
            colorPair: colorPair,
            dimensions: dimensions,
            position: position,
            rotation: rotation,
            scale: scale,
            velocity: velocity,
            flipSpeed: flipSpeed,
            terminalVelocity: terminalVelocity,
            update () {
                this.velocity.x *= 0.98;
                this.position.x += this.velocity.x;
                this.velocity.y += randomModifier * airResistance;
                this.velocity.y += gravity;
                this.velocity.y = Math.min(this.velocity.y, terminalVelocity);
                this.position.y += this.velocity.y;
                this.scale.y = Math.cos((this.position.y + randomModifier) * this.flipSpeed);
                this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
            }
        };
    };
    #hideConfetti = ()=>{
        this.#confettiElements = [];
        cancelAnimationFrame(this.#updateConfetti);
    };
    #debounce = (func, wait)=>{
        let timeout;
        return (...args)=>{
            clearTimeout(timeout);
            timeout = setTimeout(()=>func.apply(this, args), wait);
        };
    };
    init = ()=>{
        this.#setupCanvas();
        this.#updateConfetti();
        window.addEventListener("resize", this.#debounce(()=>{
            this.#setupCanvas();
            this.#hideConfetti();
        }, 200));
    };
    sprink = this.#addConfetti;
}
var $ff65987f6c0f34dd$export$2e2bcd8739ae039 = $ff65987f6c0f34dd$var$EasyConfetti;


//# sourceMappingURL=easy-confetti.js.map
