exports.static = true;
exports.logrotator = true;
exports.i18n = true;
exports.development = true;

exports.session = true;

exports.vue = {
  enable: true,
  package: 'egg-view-vue'
};

exports.vuessr = {
  enable: true,
  package: 'egg-view-vue-ssr'
};
exports.jwt = {
    enable: true,
    package: 'egg-jwt',
};
exports.redis = {
    enable: true,
    package: '../egg-redis',
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.security = {
    csrf: {
        enable: false,
    },
};
