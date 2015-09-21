'use strict';

module.exports = function(app) {
    // inject:start
    require('./dvd-description.controller')(app);
    require('./home.controller')(app);
    require('./movie-description.controller')(app);
    require('./movies.controller')(app);
    require('./shows.controller')(app);
    // inject:end
};
