steal(function(){
    App.EligibilityService = {};
    App.EligibilityService.Data = {};
}).then(
    './fixtures/data.js',
    './fixtures/functions.js',
    './controllers/core_controller.js'
);
