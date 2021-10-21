steal(function(){
    App.RewardService = {};
    App.RewardService.Data = {};
}).then(
    './controllers/controllers.js',
    './models/models.js',
    './fixtures/data.js',
    './fixtures/findAll.js'
);
