/**
 * Created by leven on 17/4/17.
 */
var Redis = require('ioredis');
//new Redis(6379, '192.168.1.1')        // 192.168.1.1:6379
var config={
    //host: 'r-m5e0ae1e72dc5a24.redis.rds.aliyuncs.com',
    host: '4.4.4.4',
    port: 6379,

    db: '0' }
var redis =  new Redis(config)

redis.hdel('activitys','UEGjjr6aeD');
