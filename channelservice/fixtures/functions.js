(function(){
    this.getUsersChannelSubscriptions = function(account_id) {
        var subscriptions = this.Subscriptions[account_id] || [],
            channelSubscriptions = {};

        this.Channels.forEach(function(channel, index, channels){
            channelSubscriptions[channel] = subscriptions.indexOf(channel) >= 0;
        });

        return channelSubscriptions;
    };

    this.getUserSubscriptions = function(account_id) {
        return this.Subscriptions[account_id] || [];
    };
}.bind(App.ChannelService.Data))();
