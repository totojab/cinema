'use strict';
var servicename = 'constants';

module.exports = function(app) {

    var dependencies = [];

    var urls = {
        rottenKey: '7ue5rxaj9xn4mhbmsuexug54',
        rottenUrl: 'http://api.rottentomatoes.com/api/public/v1.0'
    };

    function service() {
        var all = function() {
            return urls;
        };

        return {
            all: all
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
