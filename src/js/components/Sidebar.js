import Accordion from 'components/Accordion';
import ButtonSidebar from 'components/ButtonSidebar';

import Store from 'Store';
import Actions from 'Actions';

export default class Sidebar {

    constructor(el) {
        this.el = el;
        this.ui = {
            content: this.el.querySelector('.js-content')
        };

        this.components = {
            mainAccordion: new Accordion(this.el.querySelector('.js-accordion-main')),
            skillsAccordion: new Accordion(this.el.querySelector('.js-accordion-skills')),
            buttonSidebar: new ButtonSidebar(this.el.querySelector('.js-button-sidebar'))
        }

        this._setupEventListeners();
        this._buildTimelineIn();
    }

    _buildTimelineIn() {
        this._timelineIn = new TimelineLite({paused: true});
        this._timelineIn.add(this.components.buttonSidebar.transitionIn(), 0.4)
        return this._timelineIn;
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler.bind(this))
        Store.observe('isSidebarOpen', this.setOpen.bind(this));
        Store.observe(this.components.mainAccordion.storeProp, this._mainAccordionTabChange.bind(this));
    }

    _mainAccordionTabChange() {
        this.components.skillsAccordion.close();
    }

    transitionIn() {
        return this._timelineIn.play();
    }

    setOpen(isOpen) {
        isOpen
            ? this.open()
            : this.close();
    }

    open() {
        this._isOpen = true;
        const prop = window.innerWidth >= 1024 ? 'x' : 'y';
        TweenLite.killTweensOf([this.el, this.ui.content]);
        TweenLite.to(this.el, 0.8, {[prop]: '-100%', ease: Power2.easeInOut, force3D: true})
        TweenLite.fromTo(this.ui.content, 0.8, {y: '-30%'}, {y: '0%', ease: Power1.easeOut})
        this.components.mainAccordion.transitionIn();
    }

    close() {
        this._isOpen = false;
        const prop = window.innerWidth >= 1024 ? 'x' : 'y';
        TweenLite.killTweensOf([this.el, this.ui.content]);
        TweenLite.to(this.el, 0.8, {[prop]: '-0%', ease: Power2.easeInOut, force3D: true})
        this.components.mainAccordion.transitionOut();
        this.components.mainAccordion.close();
        this.components.skillsAccordion.close();
    }

    _resizeHandler() {
        if (this._isOpen) {
            const prop = window.innerWidth >= 1024 ? 'x' : 'y';
            const otherProp = prop === 'x' ? 'y' : 'x';
            TweenLite.set(this.el, {[prop]: '-100%'})
            TweenLite.set(this.el, {[otherProp]: '0%'})
        }
    }
}
