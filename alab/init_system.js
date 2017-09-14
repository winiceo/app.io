const env = require('./config/environment');

const Redis = require('ioredis');

const execSync = require('child_process').execSync;

execSync(`redis-cli -h ${env.get('REDIS_HOST')}  -p ${env.get('REDIS_PORT')} -n ${env.get('REDIS_DB')} "flushall"`);


const mongoose = require('mongoose');
/* Connect to the DB */
mongoose.connect(env.get('PARSE_SERVER_DATABASE_URI'), function(err) {
  /* Drop the DB */
  mongoose.connection.db.dropDatabase();


});


const redis = new Redis(env.get('REDIS_PORT'), env.get('REDIS_HOST'));

const options = {
  name: 'init_system',
};

redis.rpush('task', JSON.stringify(options));
