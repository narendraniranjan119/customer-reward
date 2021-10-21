(function(){
    var toTitleCase = function() {
        return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
    };

    can.Model.extend('App.RewardService.Models.Rewards', {
        findAll: function(params) {
            var self = this;

            return jQuery.ajax('rewards/all', params, {})
                .pipe(function(rewards, status){
                    return self.models(rewards);
                });
        }
    }, {
        getChannel: function() {
            return toTitleCase.call(this.channel);
        },

        getReward: function() {
            var parts = this.reward.split('_');

            return parts.map(function(part) {
                return toTitleCase.call(part);
            }).join(' ');
        }
    });
})();
