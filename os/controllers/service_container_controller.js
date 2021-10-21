(function(){
    var UnknownServiceError = (function(err){
        var Error = function(message, service) {
            this.name = 'UnknownServiceError';
            this.service = service || 'undefined';
            this.message = message ||
                sprintf(
                    '%s is not a known service.',
                    this.service
                );
        };

        Error.constructor = Error;
        Error.prototype = Object.create(err);
        Error.prototype.toString = function() {
            return sprintf('%s: %s', this.name, this.message);
        };

        return Error;
    })(ReferenceError);

    App.Abstract.Controllers.Core.extend('App.Os.Controllers.ServiceContainer', {
        pluginName: 'ServiceContainer',

        defaults: {
            services: [
                'EligibilityService',
                'ChannelService',
                'RewardService'
            ]
        }
    }, {
        init: function() {
            this.options.services.forEach(function(service){
                this.renderService(service);
            }.bind(this));
        },

        update: function(options) {
            jQuery.extend(true, this.options, (options || {}));

            this.element.children().trigger('service.update', this.options);
        },

        renderService: function(service) {
            var lastService;

            this.element.append(
                this.view('//os/views/servicecontainer/service.ejs')
            );

            lastService = this.element.children().last();

            try {
                steal(sprintf('//%1$s/%1$s.js', service.toLowerCase())).then(function(){
                    lastService[service](this.options);
                }.bind(this));
            } catch (err) {
                throw new UnknownServiceError(
                    sprintf(
                        'Unable to load %s from the server',
                        service
                    ),
                    service
                );
            }
        },

        'service.update': function(el, ev, data) {
            ev.stopPropagation();

            jQuery.extend(true, this.options, data);

            this.element.children().not(el).trigger('service.update', this.options);
        }
    });
})();
