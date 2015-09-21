'use strict';
var controllername = 'shows';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

        };
        activate();

        vm.isSearching = false;

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
