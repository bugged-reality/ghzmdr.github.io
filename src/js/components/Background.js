import StarsSketch from 'sketches/StarsSketch';
import PolkaSketch from 'sketches/PolkaSketch';
import SketchUtils from 'utils/SketchUtils';

import {debounce} from 'lodash';

export default class Background {
    constructor(el) {
        this._mainCanvas = this.el = el;
        this._mainCtx = el.getContext('2d');

        this._currentSketch = new PolkaSketch();
        this._setupEventListeners();
        this._pixelRatio = window.devicePixelRatio || 1;

        this.mouse = new SketchUtils.Vector(0, 0);
        this._steps = 0;

        this._backupCanvas = document.createElement('canvas');
        this._backupCtx = this._backupCanvas.getContext('2d');
        this.resizeHandler();
    }

    start() {
        TweenLite.ticker.addEventListener('tick', this.tickHandler.bind(this))
        TweenLite.from(this.el, 0.8, {opacity: 0, ease: Power0.easeNone})
    }

    move(left) {
        TweenLite.to(this.el, 0.95, {x: left ? '-200' : '0', ease: Power4.easeInOut, force3D: true})
    }

    _setupEventListeners() {

        window.addEventListener('resize', this.resizeHandler.bind(this))
        document.body.addEventListener('mousemove', this.mouseMoveHandler.bind(this))
        // this._mainCanvas.addEventListener('touchmove', this.touchMoveHandler)
    }

    tickHandler() {

        if (this._steps++ % 2 === 1) {
            return
        }

        this._currentSketch.step(this.mouse);
        this._currentSketch.draw(this._mainCtx);
    }

    resizeHandler() {
        //CSS width
        this.W = this._mainCanvas.offsetWidth * this._pixelRatio;
        this.H = this._mainCanvas.offsetHeight * this._pixelRatio;

        this._swapCanvas();

        //Forward resize
        this._currentSketch.resize(this.W, this.H, this._pixelRatio);
    }

    _swapCanvas() {
        // //Calc scaled sizes to mantain ratio
        // const xScale =  this.W / this._mainCanvas.width;
        // const yScale =  this.H / this._mainCanvas.height;

        // const width = this._mainCanvas.width * xScale * yScale;
        // const height = this._mainCanvas.height * yScale * xScale;

        // //Change backup canvas size, which also clears it
        // this._backupCanvas.width = this.W;
        // this._backupCanvas.height = this.H;

        // //Draw scaled main canvas
        // this._backupCtx.drawImage(this._mainCanvas, 0, 0, width, height)

        this._backupCanvas.width = this.W;
        this._backupCanvas.height = this.H;
        this._backupCtx.drawImage(this._mainCanvas, 0, 0)

        //Change main canvas size
        this._mainCanvas.width = this.W;
        this._mainCanvas.height = this.H;

        //Draw backup canvas on it
        this._mainCtx.drawImage(this._backupCanvas, 0, 0);
    }

    mouseMoveHandler(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}
