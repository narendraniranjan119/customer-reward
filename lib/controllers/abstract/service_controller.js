(function() {
    /**
     * Simplify stealing the templates in a more forgiving manner...
     *
     * Detects whether there has been a problem getting the resource
     * and calls the fail callback.
     *
     * @function loadTemplate
     *
     * @param {String} templateURI
     * @param {function} success Callback
     * @param {function} fail Callback
     *
     * @todo Actually use StealJS error CB... No idea how this works @CS
     * @codestart
     *      // think its something like this...
     *      module.options.error = function(){...};
     * @codeend
     */
    var loadTemplate = function(templateURI, success, fail) {
        steal(
            templateURI,
            function(fragment) {
                if (!fragment || fragment === undefined) {
                    return fail();
                }

                return success();
            }
        );
    };


    App.Abstract.Controllers.Core.extend('App.Abstract.Controllers.Service', {

    }, {
        'service.update': function(el, ev, data) {
            ev.stopPropagation();

            this.update(data);
        },

        update: function(options) {
            jQuery.extend(true, this.options, (options || {}));
        },

        render: function() {
            var templateDeferred = jQuery.Deferred(),
                self = this,
                templateURI = this.options.templateURI || sprintf(
                    '//%s/views/template.ejs',
                    this.constructor.pluginName.toLowerCase()
                );

            templateDeferred.done(function(){
                self.element.html(self.view(templateURI));
            });

            loadTemplate(
                templateURI,
                function() {
                    templateDeferred.resolve();
                },
                function() {
                    self.options.templateURI = '//lib/views/servicecontainer/template.ejs';
                    templateDeferred.reject();

                    return self.render();
                });

            return templateDeferred;
        },

        /**
         * @todo implement
         *
         * @function renderError
         */
        renderError: function(error) {}
    });
})();
