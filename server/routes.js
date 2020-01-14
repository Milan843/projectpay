/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function (app) {

    // Insert routes below
    app.use('/api/user', require('./api/user'));
    app.use('/api/distributor', require('./api/distributor'));

   
    // All other routes should redirect to the index.html
    // app.route('/*')
    //     .get(function (req, res) {
    //         if (process.env.NODE_ENV == "development")
    //             res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    //         if (process.env.NODE_ENV == "production")
    //             res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    //     });
};