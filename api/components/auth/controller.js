const {sign} = require('../../../auth/index.js');
const err = require('../../../utils/error.js');


const TABLA = 'auth';

const init = (injectedStore) => {

    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy.js');
    }
    const upsert= async (data) =>{
        const authData = {
            id: data.id
        }

        if(data.username){
            authData.username = data.username
        }

        if(data.password){
            authData.password = data.password
        }

        return store.upsert(TABLA,authData)
    }

    const login = async (username, password) => {
        const data = await store.query(TABLA,{username: username});

        return bcryp.compare(password, data[0].password)
            .then(sonIguales => {
                if (sonIguales) {
                    return sign(data[0]);
                } else {
                    throw err('Información invalida');
                }
            })
    };

    return {
        upsert,
        login
    }
}

module.exports = init;