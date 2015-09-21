'use strict';
var controllername = 'descriptionCtrl';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.programmes', '$stateParams', '$state'];

    function controller(programmes, $stateParams, $state) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

            if ($stateParams.movieNumber) {
                vm.number = $stateParams.movieNumber;
                vm.movie = programmes.getMovieByNumber(vm.number);
                vm.movie.reviews = [];

                programmes.getReviews(vm.movie).then(function(reviews) {
                    vm.movie.reviews = reviews;
                });
            }
        };
        activate();

        vm.goBack = function() {
            $state.go('tab.movies');
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
