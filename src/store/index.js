import { createStore } from 'vuex'

// https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate"




const store = createStore({
  state: {
    user: '',
    gen: '',
    nombreCompleto: '',
    error:''
  },
  getters: {
    getUser (state) {
      return state.user
    },    
  },
  mutations: {
    setError(state, error) {        
        state.error = error;
    },
    setUser(state, user) {        
        state.user = user;
    },
    setGen(state, gen) {
        state.gen = gen;
    },
    setNombreCompleto(state, nombreCompleto) {
        state.nombreCompleto = nombreCompleto;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})



export default store;