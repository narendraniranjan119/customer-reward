(function() {
    var self = this;

    can.fixture('GET channels/all', function(params, response, settings, headers) {
        var channelSubscriptions = self.getUsersChannelSubscriptions(params.user_id),
            subscriptions = [];

        subscriptions = jQuery.map(channelSubscriptions, function(value, key) {
            if (value) {
                return {
                    name: key
                };
            }

            return null;
        });

        response(
            200,
            "success",
            subscriptions
        );
    });
}.bind(App.ChannelService.Data))();
