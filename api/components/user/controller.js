const auth = require( "../auth/index.js");
const bcryp = require( "bcrypt");
const TABLA = 'user';

const init = (injectedStore, injectedCache) => {

    let store = injectedStore;
    let cache = injectedCache;
    if(!store){
        store = require('../../../store/dummy.js');
    }

    if(!cache){
        cache = require('../../../store/dummy.js');
    }
    const list= async () =>{
        let users = await cache.list(TABLA);

        if(!users){
            console.log("No estaba en caché, Bucando en DB")
            users = store.list(TABLA);
            cache.upsert(TABLA,users)
        } else {
            console.log("Nos traemos datos de cache")
        }

        return users;
    }

    const get = (id) =>{
        return store.get(TABLA,id)
    }

    const upsert = async (body) => {
        const user = {
            name: body.name
        }

        if(body.id){
            user.id = body.id
        }

        if(body.password || body.username){
            const userAuth = await auth.upsert({
                username: body.username,
                password:  await bcryp.hash(body.password,5)
            })
            user.authid = userAuth[0].id;
        }


        return store.upsert(TABLA,user)
    }

    const follow = async(from, to) => {
        store.upsert(TABLA+'_follow',{
            user_from: from,
            user_to: to
        })
    }

    const following = async(user) => {
        const join = {}
        join[TABLA] = 'user_to'
        const query = {user_from: user}
        return await store.query(TABLA+'_follow',query, join);
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    }
}

module.exports = init;