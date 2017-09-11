const env = require('./environment');

module.exports = {
    baseUrl: env.get('BASE_URL'),
    appURL: env.get('BASE_URL'),
    ossURL: env.get('ALI_OSS_HOST'),
    certpfx: __dirname + '/apiclient_cert.p12',
    shareimg:`${env.get('ALI_OSS_HOST')}/static/share/share.png`,
    logger: {
        dir: env.get('LOGS'),
    },
    wechat: {
        token: env.get('WECHAT_TOKEN'),
        appid: env.get('WECHAT_APPID'),
        encodingAESKey: env.get('WECHAT_ENCODINGAESKEY'),
        appsecret: env.get('WECHAT_APPSECRET'),
    },
    parse: {
        app_id: env.get('PARSE_SERVER_APPLICATION_ID'),
        master_key: env.get('PARSE_SERVER_MASTER_KEY'),
        server_url: env.get('PARSE_SERVER_URL'),
    },
    redis: {
        client: {
            host: env.get('REDIS_HOST'),
            port: env.get('REDIS_PORT'),
            password: env.get('REDIS_PASSWORD'),
            db: parseInt(env.get('REDIS_DB')) + '' || '0',
        },
        agent: true,
    },
    env,
}
;
