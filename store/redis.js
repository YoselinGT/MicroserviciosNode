const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    url: `redis://${config.cacheService.user}:${config.cacheService.password}@${config.cacheService.host}:${config.cacheService.port}`,
    pingInterval: 1000,
    legacyMode: true
});

(async () => {
    client.on("error", (err) => console.error("client err====:", err));
    client.on('connect', () => console.log('client is connect'));
    client.on('reconnecting', () => console.log('client is reconnecting'));
    client.on('ready', () => console.log('client is ready'));
    await client.connect();
    let kek = await client.hGetAll('Caas.ExposeServerCache:IE:DB:G001');
    console.log("KEK::: " + kek);

    console.log('Conectado a REDIS');
})();

/*function list(table){
    return new Promise((resolve,reject) => {
        client.get(table,(err,data) => {
            if(err){
                console.log("Error aqui _ ",err)
                return reject(err)
            }

            let res = data || null;
            if(data){
                res = JSON.stringify(data)
            }
            resolve(res)
        })
    })
}*/

 const list = async (table) => {
    const value = await client.get(table);
    return JSON.parse(value);
}

const get = async (table, id) => {
    const value = await client.get(`${table}_${id}`);
    return value;
}

const upsert = async (table, data) => {
    let key = table;
    if (data && data.id) {
        key += '_' + data.id;
    }
    const result = await client.set(key, JSON.stringify(data));

    console.log("result",result)
    return true;
}

module.exports = {
    list,
    get,
    upsert
}