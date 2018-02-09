import Accordion from 'components/Accordion';
import Store from 'Store';
import Actions from 'Actions';

export default class Header {

    constructor(el) {
        this.el = el;
        this.ui = {
            background: this.el.querySelector('.js-background'),
            title: this.el.querySelector('.js-title'),
            subtitleWords: this.el.querySelectorAll('.js-word'),
            portraitCircle: this.el.querySelector('.js-circle'),
            portraitClip: this.el.querySelector('.js-clip-path'),
            portraitShadow: this.el.querySelector('.js-shadow'),
        };

        this._buildTimelineIn();
    }

    _buildTimelineIn() {
        this._timelineIn = new TimelineLite({paused: true});

        this._timelineIn.from(this.ui.portraitClip, 1.3, {scale: 0, ease: Power3.easeInOut}, 0)
        this._timelineIn.from(this.ui.portraitCircle, 1.3, {scale: 0, ease: Power3.easeInOut}, 0)
        this._timelineIn.from(this.ui.portraitCircle, 1.3, {strokeWidth: 40, ease: Power3.easeInOut}, 0)
        this._timelineIn.to(this.ui.portraitShadow, 0.3, {opacity: 1, ease: Power0.easeNone}, 1.3)

        this._timelineIn.fromTo(this.ui.background, 1.3, {scale: 0}, {scale: 1, transformOrigin: 'top left', ease: Power3.easeInOut}, 0.4)
        this._timelineIn.fromTo(this.ui.title, 1.2, {y: '-100%'}, {y: '0%', ease: Power3.easeInOut}, 0.5)
        this._timelineIn.fromTo(this.ui.title, 1, {opacity: 0}, {opacity: 1, ease: Power0.easeNone}, 1.05)

        this._timelineIn.staggerFromTo(this.ui.subtitleWords, 0.8, {x: '-20'}, {x: '0', ease: Power3.easeOut}, 0.05, 1.15)
        this._timelineIn.staggerFromTo(this.ui.subtitleWords, 0.6, {opacity: 0}, {opacity: 1, ease: Power0.easeNone}, 0.05, 1.2);
        return this._timelineIn;
    }

    transitionIn() {
        return this._timelineIn.play();
    }
}
