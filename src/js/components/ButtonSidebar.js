import Actions from 'Actions';
import Store from 'Store';

export default class ButtonSidebar {
    constructor(el) {
        this.el = el;

        this.ui = {
            lines: this.el.querySelectorAll('.js-line')
        };

        this.el.addEventListener('click', this._clickHandler.bind(this));
        Store.observe('isSidebarOpen', this._setOpen.bind(this))
    }

    _setOpen() {
        const isOpen = Store.get('isSidebarOpen');

        if (isOpen) {
            this.open();
        } else {
            this.close();
        }

    }


    transitionIn() {
        const tl = new TimelineLite();
        tl.from(this.el, 0.6, {x: '100%', ease: Power2.easeInOut});
        tl.staggerFrom(this.ui.lines, 0.6, {x: '120%', ease: Power2.easeInOut}, 0.15, 0.2);
        return tl;
    }

    open() {

        TweenLite.to(this.el, 0.5, {x: -20, ease: Power2.easeInOut, force3D: true});
        TweenLite.to(this.ui.lines[0], 0.4, {attr:{x1: '50%', x2: '80%', y1: '25%', y2: '50%'}})
        TweenLite.to(this.ui.lines[1], 0.4, {attr:{x1: '20%', x2: '76%'}})
        TweenLite.to(this.ui.lines[2], 0.4, {attr:{x1: '50%', x2: '80%', y1: '75%', y2: '50%'}})

    }

    close() {

        TweenLite.to(this.el, 0.5, {x: 0, ease: Power2.easeInOut, force3D: true});
        TweenLite.to(this.ui.lines[0], 0.4, {attr:{x1: '40%', x2: '100%', y1: '30%', y2: '30%'}})
        TweenLite.to(this.ui.lines[1], 0.4, {attr:{x1: '40%', x2: '100%'}})
        TweenLite.to(this.ui.lines[2], 0.4, {attr:{x1: '40%', x2: '100%', y1: '70%', y2: '70%'}})

    }

    _clickHandler( ) {
        const isOpen = !Store.get('isSidebarOpen');
        Actions.setSidebarOpen(isOpen);
    }
}
