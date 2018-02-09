export default class SoundCloud {
    constructor(el) {
        this.el = el;
        this.ui = {
            widget: this.el.querySelector('.js-widget')
        };
        this.ui.widget.addEventListener('click', () => this.transitionIn())
    }

    transitionIn() {
        return TweenLite.fromTo(this.ui.widget, 1, {y: '130%', opacity: 0}, {y: '0%', opacity: 1, ease: Power3.easeInOut});
    }

    _injectWidget() {
        this.ui.widget.src ='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/387344330&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true';
        this.components = {
            widget: SC.Widget(this.ui.widget)
        }

        this.components.widget.bind(SC.Widget.Events.READY, () => this.transitionIn());
    }

    start() {
        const APIScript = document.createElement('script');
        APIScript.src = 'https://w.soundcloud.com/player/api.js';
        APIScript.addEventListener('load', () => this._injectWidget());
        TweenLite.set(this.ui.widget, {opacity: 0});
        document.body.appendChild(APIScript);
    }
}
