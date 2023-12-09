const dotenv = require("dotenv");

dotenv.config();

const config = {
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET ||'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || '',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SRV_HOST || 'localhost'
    },
    cacheService: {
        port: process.env.CACHE_SRV_PORT || 3003,
        host: process.env.CACHE_SRV_HOST || 'localhost'
    },
    post: {
        port: process.env.PORT_POST || 3002,
    },
    remoteDB: process.env.REMOTE_DB || false,
    redis: {
        host: process.env.REDIS_HOST || 'redis-14265.c267.us-east-1-4.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || '14265',
        password: process.env.REDIS_PASSWORD || 'lnZJKfNXlj2NugZHKDKoz3EGBqMMCBwj',
        user: process.env.REDIS_PASSWORD || 'default'
    }
}



module.exports = config;