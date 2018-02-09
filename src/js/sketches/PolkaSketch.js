import DotsBrush from 'brushes/DotsBrush';
import SketchUtils from 'utils/SketchUtils';

export default class PolkaSketch {

    constructor() {
        this.beacon = new SketchUtils.Vector(0, 0);
        this.brushes = [
            new DotsBrush('#8F1CBD'),
            new DotsBrush('#FFFF2B'),
            new DotsBrush('#FF1A1B'),
            new DotsBrush('#00EF5C'),
        ]
    }


    draw(ctx) {
        // ctx.clearRect(0, 0, this.W, this.H)
        this.brushes.forEach(b => b.draw(ctx));
    }

    step() {
        this.brushes.forEach(b => b.step());
    }

    resize(W, H, pixelRatio) {
        this.W = W;
        this.H = H;

        this.brushes.forEach(b => b.resize(this.W, this.H, pixelRatio));
    }
}
