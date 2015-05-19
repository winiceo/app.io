module.exports = function(app) {

    var _log = app.system.logger;

    try {
        app.all('/*', function(req, res, next) {
            // CORS headers
            res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');

            // set custom headers for CORS
            res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,X-Client-Id,X-Client-Secret,X-Access-Token');

            next();
        });
    }
    catch(e) {
        _log.error(e.stack);
        return false;
    }

};





