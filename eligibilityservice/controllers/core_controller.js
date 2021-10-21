App.Abstract.Controllers.Service.extend('App.EligibilityService.Controllers.Core', {
    pluginName: 'EligibilityService'
}, {
    'service.update': function(el, ev, data) {
        ev.stopPropagation();
    }
});
