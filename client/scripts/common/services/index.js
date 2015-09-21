'use strict';

module.exports = function(app) {
    // inject:start
    require('./programmes.service')(app);
    // inject:end
};
