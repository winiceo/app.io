var mailer = require('nodemailer');

module.exports = function(app) {

    var _log   = app.lib.logger;
    var _group = 'BOOT:MAILER';

    try {
        var _conf = app.lib.bootConf(app, 'mailer');

        if( ! _conf )
            return false;

        return mailer.createTransport(_conf);
    }
    catch(e) {
        _log.error(_group, e.stack);
        return false;
    }

};





