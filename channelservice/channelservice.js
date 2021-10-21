steal(function(){
    App.ChannelService = {};
    App.ChannelService.Data = {};
}).then(
    './fixtures/data.js',
    './fixtures/findAll.js',
    './fixtures/functions.js',
    './controllers/controllers.js',
    './models/channel_model.js'
);
