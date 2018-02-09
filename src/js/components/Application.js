import {bindAll} from 'lodash';

import Background from 'components/Background';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import SoundCloud from 'components/SoundCloud';
import WorkInProgress from 'components/WorkInProgress';

import Actions from 'Actions';
import Store from 'Store';

export default class Application {

    constructor(el) {
        this.el = el;
        this.components = {
            background: new Background(this.el.querySelector('.js-background')),
            sidebar: new Sidebar(this.el.querySelector('.js-sidebar')),
            header: new Header(this.el.querySelector('.js-header')),
            soundCloud: new SoundCloud(this.el.querySelector('.js-player')),
            wip: new WorkInProgress(this.el.querySelector('.js-wip'))
        };

        this.ui = {
            background: this.el.querySelector('.js-background'),
            scrollHint: this.el.querySelector('.js-scroll-hint')
        };

        bindAll(this, '_transitionInCompleteHandler', '_moveBackground');

        this._setupEventListeners();
        requestAnimationFrame(this.transitionIn.bind(this))
    }

    transitionIn() {
        this._timelineIn = new TimelineLite({onComplete: this._transitionInCompleteHandler});

        this._timelineIn.set(this.el, {autoAlpha: 1}, 0);
        this._timelineIn.add(this.components.header.transitionIn(), 0.3);
        this._timelineIn.add(this.components.sidebar.transitionIn(), 1.4);

    }

    _setupEventListeners() {
        Store.observe('isSidebarOpen', this._moveBackground.bind(this))
    }

    _moveBackground(isSidebarOpen) {
        if (window.innerWidth > 1024) {
            this.components.background.move(isSidebarOpen);
        }
    }

   _transitionInCompleteHandler() {
        this._timelineIn.kill();
        delete this._timelineIn;
        this.components.background.start();
        this.components.wip.transitionIn()
        this.components.soundCloud.start();
        TweenLite.fromTo(this.ui.scrollHint, 0.5, {opacity: 0}, {opacity: 1})
   }

}
