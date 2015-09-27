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
        vm.dvdArray = [];
        vm.dvdDisplayed = [];
        vm.searchActivation = function() {
            vm.isSearching = !vm.isSearching;
        };

        vm.filterMovies = function(filter) {
            vm.dvdDisplayed = programmes.allDvd();
            vm.dvdDisplayed = programmes.filterTitles(vm.dvdDisplayed, filter);
        };

        var activate = function() {
            programmes.getDvd().then(function(movies) {
                vm.dvdDisplayed = movies;
            });

        };
        activate();

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
