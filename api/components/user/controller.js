import auth from "../auth/index.js";
import bcryp from "bcrypt";

const TABLA = 'user';

const init = (injectedStore) => {

    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy.js');
    }
    const list= () =>{
        return store.list(TABLA)
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

export default init;