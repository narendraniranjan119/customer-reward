(function(){
    var toTitleCase = function() {
        return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
    };

    can.Model.extend('App.ChannelService.Models.Channel', {
        findAll: function(params) {
            var self = this;

            return jQuery.ajax('channels/all', params, {})
                .pipe(function(channels, status){
                    return self.models(channels);
                });
        }
    }, {
        getName: function() {
            return toTitleCase.call(this.name);
        }
    });
})();

