import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '../utils/index'
import api from '../utils/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userMsg: {}
    },
    mutations: {
        'CHANGE_USERMSG'(state,userMsg) {
            state.userMsg = userMsg
            // console.log(state.userMsg);
            
        }
    },
    actions: {
        getUserMsg(context) {
            // return new Promise((resolve) =>{
                fetch.get(api.getUserMsg).then(res =>{
                    if(res.code == 200){
                        context.commit('CHANGE_USERMSG',res.data)
                        // resolve(res)
                    }
                })
            // })
        }
    },
    plugins: [
        createPersistedState({
          storage: {
            getItem: key => sessionStorage.getItem(key),
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>
              sessionStorage.setItem(key, value),
            removeItem: key => sessionStorage.removeItem(key),
          },
        }),
      ],
})

export default store