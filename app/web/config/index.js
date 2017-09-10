module.exports = {
    wechat: {
        appid: 'wxf9ab002c67d9fb8f',
    },
    api:{
        root:  process.env.NODE_ENV === 'production'?"http://ds.1.71an.com/cms?m=/api":"/api/v1"
    },
    crm:{
        name:"赏客优"
    }

}
