'use strict';
var servicename = 'programmes';
var _ = require('lodash');

module.exports = function(app) {
    var rottenKey = '7ue5rxaj9xn4mhbmsuexug54';
    var dependencies = ['$http'];

    function service($http) {
        var add = function(a, b) {
            return a + b;
        };

        var moviesArray = [];

        var getMovies = function() {
            var request = $http({
                method: 'get',
                url: 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=' + rottenKey + '&page_limit=20',
                params: {
                    action: 'get'
                }
            });
            return request
                .then(function(response) {
                    return response.data.movies;

                }).then(function(movies) {
                    moviesArray = movies;
                    return moviesArray;
                });

        }

        var getReviews = function(movie) {
            var request = $http({
                method: 'get',
                url: 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + movie.id + '/reviews.json?apikey=' + rottenKey,
                params: {
                    action: 'get'
                }
            });
            return request
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                })

        };

        var allMovies = function() {
            return moviesArray;
        };

        var getMovieByNumber = function(number) {
            return moviesArray[number];
        };

        var filterTitles = function(movies, filter) {

            if (!filter || filter === '' || filter === ' ') {
                return movies;
            }
            filter = filter.replace(' ,', ',');
            filter = filter.replace(', ', ',');

            var filterArray = filter.split(',');

            return _.filter(movies, function(item) {
                return _.contains(filterArray, item.title);
            });
        };

        return {
            add: add,
            allMovies: allMovies,
            getMovies: getMovies,
            filterTitles: filterTitles,
            getMovieByNumber: getMovieByNumber,
            getReviews: getReviews
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
