class Analytics {
    track(category, action, value) {
        ga('send', 'event', category, action, null, value);
        // console.log('Analytics', arguments);
    }
}

export default new Analytics();
