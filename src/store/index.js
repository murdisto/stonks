import { createStore } from "vuex";
import * as fb from '../firebase';
import router from '../router'

export default createStore({
  state: {
    userProfile: {},
    loadingStatus: false
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    loadingStatus(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email
      })
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      commit('loadingStatus', true)
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit('setUserProfile', userProfile.data());
      commit('loadingStatus', false);
      router.push('/dashboard');
    },
    async signout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
      router.push('/login');
    }
  },
  getters: {
    loadingStatus(state) {
      return state.loadingStatus;
    }
  },
  modules: {}
});
