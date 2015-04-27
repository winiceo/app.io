function Verify(req, res, next) {

    var _app    = req.app;
    var _env    = _app.get('env');
    var _resp   = _app.system.response.app;
    var _schema = _app.lib.schema;

    new _schema('system.users').init(req, res, next).get({register_token: req.params.token, qt: 'one'}, function(err, doc) {
        if( ! doc ) {
            return next( _resp.Unauthorized({
                type: 'InvalidCredentials',
                errors: ['not found token']
            }));
        }
        else if(doc.is_enabled == 'Yes') {
            return next( _resp.Unauthorized({
                type: 'InvalidCredentials',
                errors: ['enabled user']
            }));
        }

        req.userData     = doc;
        req.userData._id = req.userData._id.toString();

        next();
    });

}

module.exports = function(app) {
    return Verify;
};