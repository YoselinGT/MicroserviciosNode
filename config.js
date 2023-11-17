import dotenv from "dotenv";
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
    post: {
        port: process.env.PORT_POST || 3002,
    },
    remoteDB: process.env.REMOTE_DB || false
}



export default config;