import SketchUtils from 'utils/SketchUtils';
import FastSimplexNoise from 'fast-simplex-noise';

const RAD = Math.PI * 2;
const DIRECTIONS = ['up', 'right', 'down', 'left'];

export default class DotsBrush {

    constructor(color, shadow) {
        this.beacon = new SketchUtils.Vector(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
        this.noise = new FastSimplexNoise({ min: 0, max: 2 })
        this.direction = DIRECTIONS[0];
        this._stroke = 'rgba(2, 11, 25, 0.4)';
        this.color = color

        this.requestChange();
    }

    changeDirection() {
        const randDir = ~~(this.noise.scaled2D(this.beacon.x, this.beacon.y));
        const directionIndex = DIRECTIONS.indexOf(this.direction);
        const oppositeIndex = (directionIndex + ~~(DIRECTIONS.length / 2)) %  (DIRECTIONS.length);
        const availDirections = DIRECTIONS.filter((d, i) => i !== directionIndex && i !== oppositeIndex);
        this.direction = availDirections[randDir];
    }

    requestChange() {
        setTimeout(() => {
            this.changeDirection();
            this.requestChange();
        }, Math.random() * 1000 + 400 );
    }

    draw(ctx) {
        ctx.strokeStyle = this._stroke;
        ctx.lineWidth = 1 * this._pixelRatio;
        ctx.fillStyle = this.color;
        // ctx.shadowBlur = 10 * this._pixelRatio;
        // ctx.shadowColor = this.shadowColor || 'rgba(0,0,0,0.4)';

        for (var i = 0; i < this.dots.length; ++i) {
            if (this.dots[i].radius < 0.1) continue;
            ctx.beginPath();
            ctx.arc(this.dots[i].x, this.dots[i].y, this.dots[i].radius, 0, RAD);
            ctx.fill();
            ctx.stroke();
        }
    }

    step() {

        for (var i = 0; i < this.dots.length; ++i) {
            this.setDotWidth(this.dots[i]);
            // console.log(this.dots);
        }

        this.advanceBeacon(this.direction);

    }

    resize(W, H, pixelRatio) {
        this.W = W; this.H = H;
        this._pixelRatio = pixelRatio;

        this._maxDimension = Math.max(W, H);

        this._circleRadius = 20;
        this._circleDist = this._circleRadius / 2;
        this.columns = this.W / this._circleDist + 1;
        this.rows = this.H / this._circleDist + 1;

        this._greaterSide = Math.max(this.columns, this.rows);

        this.generateDots();
    }

    setDotWidth(d) {
        var delta = Math.max(d.dist(this.beacon), 0);

        delta *= SketchUtils.map(
            Math.random() * Math.random() * Math.random(),
            0, 1,
            1, 20
        )

        if (delta >= this._greaterSide/2) {
            d.radius = 0;
        } else {
            d.radius = SketchUtils.map(delta, 0, this._greaterSide/2, this._circleRadius, 0);
        }
    }

    generateDots() {
        this.dots = [];
        for (var ci = 0; ci < this.columns; ++ci) {
            for (var ri = 0; ri < this.rows; ++ri){
                var dot = new SketchUtils.Vector(ci * this._circleDist, ri * this._circleDist);
                dot.radius = 0;
                this.dots.push(dot)
            }
        }
    }

    advanceBeacon(direction) {

        const step = 5 * this._pixelRatio * this._maxDimension > 1800 ? 5 : 1;

        switch (direction) {
            case 'up':
                this.beacon.y -= step;
                break;
            case 'right':
                this.beacon.x += step;
                break;
            case 'down':
                this.beacon.y += step;
                break;
            case 'left':
                this.beacon.x -= step;
                break;
        }

        if (this.beacon.x < 0) {
            this.beacon.x += this.W
        } else if (this.beacon.x > this.W) {
            this.beacon.x %= this.W;
        }

        if (this.beacon.y < 0) {
            this.beacon.y += this.H
        } else if (this.beacon.y > this.H) {
            this.beacon.y %= this.H;
        }

    }
}
