class Analytics {
    track(category, action, value) {

        gtag('event', action, {
          'event_category': category,
          'event_label': value
        });

        // ga('send', 'event', category, action, null, value);
        // console.log('Analytics', arguments);
    }
}

export default new Analytics();
