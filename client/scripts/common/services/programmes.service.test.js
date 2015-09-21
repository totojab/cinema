'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular');
require('angular-mocks');
var app = require('../')('app');
var servicename = 'programmes';
describe(app.name, function() {

    describe('Services', function() {

        describe(servicename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.service = $injector.get(app.name + '.' + servicename);
            }));

            it('should be defined', function() {
                expect(this.service).toBeDefined();
            });

            it('should get 20 movies', function() {
                var res = [];
                this.service.getMovies().then(function(movies) {
                    res = movies;

                    expect(res.length).toEqual(20);
                });
            });

        });
    });
});
