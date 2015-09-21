'use strict';
var controllername = 'shows';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.programmes'];

    function controller(programmes) {
        var vm = this;
        vm.controllername = fullname;
        vm.isSearching = false;
        vm.moviesArray = [];
        vm.moviesDisplayed = [];
        vm.searchActivation = function() {
            vm.isSearching = !vm.isSearching;
        };

        vm.filterMovies = function(filter) {
            vm.moviesDisplayed = programmes.allMovies();
            vm.moviesDisplayed = programmes.filterTitles(vm.moviesDisplayed, filter);
        };

        var activate = function() {
            programmes.getDvd().then(function(movies) {
                vm.moviesDisplayed = movies;
            });

        };
        activate();

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
