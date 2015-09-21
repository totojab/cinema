'use strict';
require('angular-ui-router');
require('angular-sanitize');
require('angular-animate');
require('ionic');
require('ionic-angular');
require('ng-cordova');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'ngCordova']);
    // inject:folders start
    require('./controllers')(app);
    require('./directives')(app);
    require('./services')(app);
    // inject:folders end

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/tab/home');

        $stateProvider

        // setup an abstract state for the tabs directive

        .state('tab', {
            url: '/tab',
            abstract: true,
            template: require('./views/tabs.html')
        })

        // Each tab has its own nav history stack:

        .state('tab.home', {
            url: '/home',
            views: {
                'home': {
                    template: require('./views/home.html'),
                    controller: fullname + '.home as vm'
                }
            }
        })

        .state('tab.shows', {
            url: '/shows',
            views: {
                'shows': {
                    template: require('./views/shows.html'),
                    controller: fullname + '.shows as vm'
                }
            }
        })

        .state('tab.dvdescription', {
            url: '/movies/:movieNumber',
            views: {
                'shows': {
                    template: require('./views/dvd-description.html'),
                    controller: fullname + '.dvdDescription as vm'

                }
            }
        })

        .state('tab.movies', {
            url: '/movies',
            views: {
                'movies': {
                    template: require('./views/movies.html'),
                    controller: fullname + '.moviesCtrl as vm'

                }
            }
        })

        .state('tab.description', {
            url: '/description/:movieNumber',
            views: {
                'movies': {
                    template: require('./views/movie-description.html'),
                    controller: fullname + '.descriptionCtrl as vm'

                }
            }
        });
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
