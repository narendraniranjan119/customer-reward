App.Abstract.Controllers.Core.extend('App.Os.Controllers.Core', {
    pluginName: 'OSCore'
}, {
    init: function() {
        try {
            this.initAttributes();
            this.render();
            this.main();
        } catch (error) {
            alert(error);
        }
    },

    update: function(options) {
        jQuery.extend(true, this.options, (options || {}));
        this.main();
    },

    main: function() {
        this.elements.service.ServiceContainer(this.options);
    },

    initAttributes: function() {
        this.elements = [];
    },

    render: function() {
        this.element.empty();
        this.element.append(this.view('//os/views/navigation.ejs'));
        this.elements.navigation = this.element.children('nav');
        this.element.append(this.view('//os/views/servicecontainer.ejs'));
        this.elements.service = this.element.children('.service-container');
    },

    'input[type=text].form-control keyup': function(el, ev) {
        ev.preventDefault();
        ev.stopPropagation();

        if (ev.keyCode === 13) {
            this.update({
                user_id: el.val()
            });
        }
    },

    'button[type=submit] click': function(el, ev) {
        ev.preventDefault();

        this.update({
            user_id: this.elements.navigation.find('input').val()
        });
    }
});
