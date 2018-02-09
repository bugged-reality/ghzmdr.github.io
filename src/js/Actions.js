import Store from 'Store';

const Actions = {
    setAccordionPanelOpen: function(slug, isOpen) {
        Store.set(slug, isOpen);
    },

    setSidebarOpen: function(bool) {
        Store.set('isSidebarOpen', bool);
    }
};

export default Actions;
