const TABLA = 'post';

const init = (injectedStore) => {

    let store = injectedStore;

    if(!store){
        store = require('../../../store/dummy.js');
    }
    const list= async () =>{

        return store.list(TABLA)
    }

    return {
        list
    }
}

export default init;