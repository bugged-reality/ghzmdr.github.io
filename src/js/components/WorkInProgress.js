import {bindAll} from 'lodash';

export default class WorkInProgress {
    constructor(el) {
        this.el = el;
        this.ui = {
            content: this.el.querySelector('.js-content'),
            buttonClose: this.el.querySelector('.js-button-close'),
        }

        bindAll(this, '_buttonClickHandler', '_reverseCompleteHandler');

        this.el.addEventListener('click', this._buttonClickHandler);
        this._buildTimelineIn();
    }

    _buildTimelineIn() {
        this._timelineIn = new TimelineLite({paused: true, onReverseComplete: this._reverseCompleteHandler});
        this._timelineIn.from(this.el, 1, {y: '130%', ease: Power3.easeInOut})
        // this._timelineIn.from(this.el, 1, {opacity: 0, ease: Power0.easeNone}, 0)
        this._timelineIn.from(this.ui.buttonClose, 0.5, {scale: 0, ease: Power2.easeIn}, 0.6)
        this._timelineIn.from(this.ui.content, 0.5, {opacity: 0, ease: Power0.easeNone}, 0.6)
        return this._timelineIn;
    }

    transitionIn() {
        return this._timelineIn.play();
    }

    transitionOut() {
        this._timelineIn.kill();
        this._buildTimelineIn();
        this._timelineIn.seek(this._timelineIn.totalDuration());
        this._timelineIn.reverse();
    }

    _remove() {
        this.el.removeEventListener('click', this._buttonClickHandler);
        this.el.parentNode.removeChild(this.el);
    }

    _buttonClickHandler() {
        this.transitionOut();
    }

    _reverseCompleteHandler() {
        this._remove();
    }
}
