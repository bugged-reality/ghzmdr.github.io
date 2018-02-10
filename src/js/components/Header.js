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
            socialItems: Array.from(this.el.querySelectorAll('.js-social-item'))
        };

        this._buildTimelineIn();
        this._setupEventListeners();
    }

    _setupEventListeners() {
        if (window.innerWidth < 1024) return;

        this.ui.socialItems.forEach(
            (item, index) => this._bindSocialItemHover(item, index)
        )
    }

    _bindSocialItemHover(el, index) {
        el.addEventListener('mouseenter', this._socialItemMouseEnter.bind(this, index))
        el.addEventListener('mouseleave', this._socialItemMouseLeave.bind(this))
    }

    _socialItemMouseEnter(index) {
        const tl = new TimelineLite();

        var prevItems, nextItems;
        if (index !== 0) {
            prevItems = this.ui.socialItems.slice(0, index);
            tl.to(prevItems, 0.4, {x: -5, ease: Power2.easeInOut}, 0)
        }

        tl.to(this.ui.socialItems[index], 0.4, {scale: 1.2, ease: Power2.easeInOut, force3D: true}, 0)

        if (index !== this.ui.socialItems.length - 1) {
            nextItems = this.ui.socialItems.slice(index + 1, this.ui.socialItems.length)
            tl.to(nextItems, 0.4, {x: 5, ease: Power2.easeInOut}, 0)
        }
    }

    _socialItemMouseLeave() {
        TweenLite.to(this.ui.socialItems, 0.4, {x: 0, scale: 1, ease: Power2.easeInOut})
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

        this._timelineIn.staggerFrom(this.ui.socialItems, 0.6, {x: 30, ease: Power2.easeOut}, 0.1, 1.1)
        this._timelineIn.staggerFrom(this.ui.socialItems, 0.4, {opacity: 0, ease: Power0.easeNone}, 0.1, 1.2)
        this._timelineIn.staggerFrom(this.ui.socialItems, 0.6, {scale: 0.2, ease: Power2.easeInOut}, 0.1, 1.5)

        this._timelineIn.staggerFromTo(this.ui.subtitleWords, 0.8, {x: '-20'}, {x: '0', ease: Power3.easeOut}, 0.05, 1.15)
        this._timelineIn.staggerFromTo(this.ui.subtitleWords, 0.6, {opacity: 0}, {opacity: 1, ease: Power0.easeNone}, 0.05, 1.2);
        return this._timelineIn;
    }

    transitionIn() {
        return this._timelineIn.play();
    }
}
