import {bindAll} from 'lodash';
import Store from 'Store';
import Actions from 'Actions';
import {getAbsoluteHeight} from 'utils/DOMUtils';

class AccordionRow {

    constructor(el, storeProp) {
        this.el = el;
        this.ui = {
            button: this.el.querySelector('.js-button'),
            panel: this.el.querySelector('.js-panel'),
            content: this.el.querySelector('.js-panel-content')
        };

        TweenLite.set(this.ui.panel, {height: 0});

        this.storeProp = storeProp;
        this.slug = this.el.dataset.slug;
        this.color = this.el.dataset.color;

        bindAll(this, '_buttonClickHandler', '_setPanelOpen');

        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.ui.button.addEventListener('click', this._buttonClickHandler);
        Store.observe(this.storeProp, this._setPanelOpen);
    }

    _setPanelOpen(slug) {
        if (slug === this.slug) {
            this._openPanel();
        } else {
            this._closePanel();
        }
    }

    close() {
        Actions.setAccordionPanelOpen(this.storeProp, false);
    }

    _closePanel() {
        this._isOpen = false;
        TweenLite.killTweensOf(this.ui.panel);
        if (this.color) {
            TweenLite.to(this.el, 1, {backgroundColor: '#78909C'});
        }
        TweenLite.to(this.ui.panel, 0.6, {ease: Power2.easeInOut, height: 0, onComplete:() => {this.ui.panel.scrollTop = 0; this.ui.panel.children[0].scrollTop = 0;}});
        TweenLite.to(this.ui.panel, 0.45, {ease: Power0.easeNone, autoAlpha: 0});
    }

    _openPanel() {
        this._isOpen = true;
        const contentHeight = getAbsoluteHeight(this.ui.content);

        TweenLite.killTweensOf(this.ui.panel);
        if (this.color) {
            TweenLite.to(this.el, 0.8, {backgroundColor: this.color});
        }
        TweenLite.to(this.ui.panel, 0.6, {ease: Power2.easeInOut, height: contentHeight, onComplete: () => this.ui.panel.style.height = 'auto'});
        TweenLite.fromTo(this.ui.panel, 0.4, {autoAlpha: 0}, {ease: Power0.easeNone, delay: 0.1, autoAlpha: 1});
    }

    _buttonClickHandler() {
        Actions.setAccordionPanelOpen(this.storeProp, this._isOpen ? null : this.slug);
    }
}

export default class Accordion {
    constructor(el) {
        this.el = el;

        const storeProp = 'accordion_' + this.el.dataset.name + '_panel';

        const rows = Array.from(this.el.querySelectorAll('.js-accordion-row'))
                        .filter(el => el.parentNode === this.el);

        this.ui = { rows };

        this.components = {
            rows: this.ui.rows.map(r => new AccordionRow(r, storeProp))
        }
    }

    transitionIn() {
        if (!this._timelineIn) this._buildTimelineIn();
        this._timelineIn.play();
    }

    transitionOut() {
        if (!this._timelineIn) this._buildTimelineIn();
        this._timelineIn.reverse();
    }

    _buildTimelineIn() {
        this._timelineIn = new TimelineLite();
        this._timelineIn.staggerFromTo(this.ui.rows, 0.3, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.5,  ease: Power0.easeNone}, 0.15)
    }

    close() {
        this.components.rows.forEach(function(r) {
            r.close();
        });
    }
}
