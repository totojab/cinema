'use strict';
var controllername = 'dvdDescription';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.programmes', '$stateParams', '$state'];

    function controller(programmes, $stateParams, $state) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

            if ($stateParams.dvdNumber) {

                vm.number = $stateParams.dvdNumber;
                vm.movie = programmes.getDvdByNumber(vm.number);
                vm.movie.reviews = [];
                programmes.getReviews(vm.movie).then(function(reviews) {
                    vm.movie.reviews = reviews;
                });
            }
        };
        activate();

        vm.goBack = function() {
            $state.go('tab.shows');
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
