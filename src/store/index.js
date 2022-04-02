import Vue from 'vue';
import Vuex from 'vuex';
import { userLogin } from '../api/user/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    userLogin: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await userLogin(form);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    }
  },
  modules: {
  },
});
