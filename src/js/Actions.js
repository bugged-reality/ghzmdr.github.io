import Store from 'Store';
import Analytics from 'utils/Analytics';

const Actions = {
    setAccordionPanelOpen: function(slug, isOpen) {
        Store.set(slug, isOpen);

        if (isOpen) {
            Analytics.track('Accordion', 'openTab', slug);
        } else {
            Analytics.track('Accordion', 'closeTab', slug);
        }
    },

    setSidebarOpen: function(bool) {
        Store.set('isSidebarOpen', bool);

        if (bool) {
            Analytics.track('Sidebar', 'open', bool);
        }
    }
};

export default Actions;
