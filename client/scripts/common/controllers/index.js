'use strict';

module.exports = function(app) {
    // inject:start
    require('./description.controller')(app);
    require('./home.controller')(app);
    require('./movies.controller')(app);
    require('./shows.controller')(app);
    // inject:end
};
