(function(_channelData){
    _channelData.Channels = [
        'SPORTS',
        'KIDS',
        'MUSIC',
        'NEWS',
        'MOVIES'
    ];

    _channelData.Subscriptions = {
        '1001': ['SPORTS', 'KIDS', 'MUSIC', 'NEWS', 'MOVIES'],
        '1002': ['KIDS', 'NEWS'],
        '1003': ['MUSIC', 'NEWS']
    };
})(App.ChannelService.Data);
