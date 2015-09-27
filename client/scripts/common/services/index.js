'use strict';

module.exports = function(app) {
    // inject:start
    require('./constants.service')(app);
    require('./programmes.service')(app);
    // inject:end
};
