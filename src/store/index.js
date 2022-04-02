import Vue from 'vue';
import Vuex from 'vuex';
import { userLogin } from '../api/user/index.js';
import { getMember, delMember, addMember, getMemberInfo, editMember } from '../api/member/index.js';
import { getSupplierList, addSupplier, delSupplier, findSupplier, editSupplier } from '../api/supplier/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: ''
  },
  mutations: {
    getUserName(state, name) {
      state.userName = name;
    }
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
    },
    getMember: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await getMember(form);
          // console.log(data);
          resolve(data)
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    },
    delMember: function ({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await delMember(id);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    },
    addMember: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await addMember(form);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    },
    searchMember: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await getMember(form)
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error)
        }
      })
    },
    findMember: function ({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await getMemberInfo(id);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error)
        }
      })
    },
    upEditMember: function ({ commit }, obj) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await editMember(obj.id, obj.data);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error)
        }
      })
    },
    getSupplierList: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await getSupplierList(form);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    },
    delSupplier: function ({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await delSupplier(id);
          resolve(data);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    },
    addSupplier: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await addSupplier(form);
          resolve(data);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      })
    },
    findSupplier: function ({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await findSupplier(id);
          resolve(data);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      })
    },
    editSupplier: function ({ commit }, form) {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await editSupplier(form.id, form.data);
          resolve(data);
        } catch (err) {
          console.log(err);
          reject(err)
        }
      })
    },
    getUserName: function ({ commit }, name) {
      commit('getUserName', name)
    }
  },
  modules: {
  },
});
