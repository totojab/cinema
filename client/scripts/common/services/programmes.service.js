'use strict';
var servicename = 'programmes';
var _ = require('lodash');

module.exports = function(app) {

    var dependencies = ['$http', app.name + '.constants'];

    function service($http, constants) {

        var urls = constants.all();

        var moviesArray = [];
        var dvdArray = [];

        var getMovies = function() {
            var request = $http({
                method: 'get',
                url: urls.rottenUrl + '/lists/movies/in_theaters.json?apikey=' +
                    urls.rottenKey + '&page_limit=20',
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
        };

        var getDvd = function() {
            var request = $http({
                method: 'get',
                url: urls.rottenUrl + '/lists/dvds/new_releases.json?apikey=' +
                    urls.rottenKey + '&page_limit=20',
                params: {
                    action: 'get'
                }
            });
            return request
                .then(function(response) {
                    return response.data.movies;

                }).then(function(movies) {
                    dvdArray = movies;
                    return dvdArray;
                });
        };

        var getReviews = function(movie) {
            var request = $http({
                method: 'get',
                url: urls.rottenUrl + '/movies/' + movie.id + '/reviews.json?apikey=' +
                    urls.rottenKey,
                params: {
                    action: 'get'
                }
            });
            return request
                .then(function(response) {
                    return response.data;
                });
        };

        var allMovies = function() {
            return moviesArray;
        };

        var allDvd = function() {
            return dvdArray;
        };

        var getMovieByNumber = function(number) {
            if (moviesArray && moviesArray.length > number) {
                return moviesArray[number];
            } else {
                return {
                    title: 'Movie not found'
                };
            }
        };

        var getDvdByNumber = function(number) {
            if (dvdArray && dvdArray.length > number) {
                return dvdArray[number];
            } else {
                return {
                    title: 'Movie not found'
                };
            }
        };

        var filterTitles = function(movies, filter) {

            if (!filter || filter === '' || filter === ' ') {
                return movies;
            }

            var filterArray = filter.split(',');

            return _.filter(movies, function(item) {
                return _.contains(item.title.toLowerCase(), filterArray);
            });
        };

        var replaceMovies = function(a) {
            moviesArray = a;
        };

        var replaceDvd = function(a) {
            dvdArray = a;
        };

        return {
            allMovies: allMovies,
            getMovies: getMovies,
            filterTitles: filterTitles,
            getMovieByNumber: getMovieByNumber,
            getReviews: getReviews,
            allDvd: allDvd,
            getDvd: getDvd,
            getDvdByNumber: getDvdByNumber,
            replaceMovies: replaceMovies,
            replaceDvd: replaceDvd
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
