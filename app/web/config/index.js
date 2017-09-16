// let BACKEND_DOMAIN = 'http://localhost:7001'
// if (process.env.NODE_ENV === 'production') {
//     BACKEND_DOMAIN = 'http://h5.limesoftware.cn'
// } else if (process.env.NODE_ENV === 'development') {
//     BACKEND_DOMAIN = 'http://localhost:7001'
// }
module.exports = {
    wechat: {
        appid: 'wxf9ab002c67d9fb8f',
    },
    api:{
        root:  process.env.NODE_ENV === 'production'?"/api/v1":"/api/v1"
    },
    crm:{
        name:"赏客优"
    },
    baseUrl:process.env.NODE_ENV === 'production'?'http://cms.71an.com':'http://localhost:7001'

}
