'use strict';
/*eslint consistent-this:[0] */
var angular = require('angular');
require('angular-mocks');
var app = require('../')('app');
var servicename = 'programmes';
describe(app.name, function() {

    describe('Services', function() {

        describe(servicename, function() {

            var moviesTestList = [{
                title: 'Matrix Reloaded'
            }, {
                title: 'Star Wars II'
            }, {
                title: 'Minority Report'
            }, {
                title: 'Intouchables'
            }];

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

            it('filter should work with part names', function() {
                var res = this.service.filterTitles(moviesTestList, 'touch');
                expect(res).toEqual([{
                    title: 'Intouchables'
                }]);
            });

            it('filter should work with name with spaces', function() {
                var res = this.service.filterTitles(moviesTestList, ' ');
                expect(res).toEqual(moviesTestList);
            });

            it('allMovies() should return a defined array', function() {
                var res = this.service.allMovies();
                expect(res).toBeDefined();
            });

            it('allDvd() should return a defined array', function() {
                var res = this.service.allDvd();
                expect(res).toBeDefined();
            });

            it('getMovieByNumber should work with empty array', function() {
                var res = this.service.getMovieByNumber(2);
                expect(res).toBeDefined();
            });

            it('getMovieByNumber should work with non empty array', function() {
                this.service.replaceMovies(moviesTestList);
                var res = this.service.getMovieByNumber(2);
                expect(res).toEqual({
                    title: 'Minority Report'
                });
            });

            it('getDvdByNumber should work with empty array', function() {
                var res = this.service.getDvdByNumber(2);
                expect(res).toBeDefined();
            });

            it('getdvdByNumber should work with non empty array', function() {
                this.service.replaceDvd(moviesTestList);
                var res = this.service.getDvdByNumber(2);
                expect(res).toEqual({
                    title: 'Minority Report'
                });
            });

        });
    });
});
