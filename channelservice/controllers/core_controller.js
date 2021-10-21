App.Abstract.Controllers.Service.extend('App.ChannelService.Controllers.Core', {
    pluginName: 'ChannelService'
}, {
    init: function() {
        this.elements = {};
        this.main();
    },

    update: function(options) {
        jQuery.extend(true, this.options, (options || {}));
        this.main();
    },

    main: function() {
        this.render().done(function(){
            this.elements.body = this.element.find('.body');
            if (this.options.user_id) {
                this.getInfo();
            }
        }.bind(this));
    },

    getInfo: function() {
        var self = this;

        return App.ChannelService.Models.Channel.findAll(this.options)
            .done(function(channels){
                if (channels.length) {
                    self.renderChannels(channels);
                } else {
                    self.elements.body.html(self.view('//channelservice/views/no_subscriptions.ejs'));
                }
            }).fail(function(error){
                self.renderError(error);
            });
    },

    renderChannels: function(channels) {
        var channelsContainer,
            self = this;

        this.elements.body.html(this.view('//channelservice/views/channels.ejs'));
        channelsContainer = this.elements.body.children('.channels');

        channels.each(function(channel) {
            channelsContainer.append(self.view('//channelservice/views/channel.ejs', {
                channel: channel
            }));
        });
    }
});
