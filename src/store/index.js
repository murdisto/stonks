import { createStore } from "vuex";
import * as fb from '../firebase';
import firebase from 'firebase/app';
import router from '../router'

export default createStore({
  state: {
    userProfile: {
      email: "",
      name: "",
      stonks: []
    },
    loadingStatus: false,
    errorMessage: null,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    loadingStatus(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus;
    },
    setErrorMessage(state, error) {
      state.errorMessage = error;
      console.log('state.errorMessage: ', state.errorMessage);
    }
  },
  actions: {
    async login({ dispatch, commit }, form) {
      try {
        commit('setErrorMessage', null);
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
        dispatch('fetchUserProfile', user)
      } catch (error) {
        commit('setErrorMessage', error.message);
        console.log(this.state.errorMessage);
      }
    },
    async signup({ dispatch, commit }, form) {
      try {const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        stonks: []
      })
        dispatch('fetchUserProfile', user)
      } catch (error) {
        commit('setErrorMessage', error.message);
        console.log(this.state.errorMessage);
      }
    },
    async addFollowedStonk({ commit }, result) { 
      const { currentUser } = firebase.auth();
      await fb.usersCollection.doc(currentUser.uid).update({
        stonks: firebase.firestore.FieldValue.arrayUnion(result)
      });
      const userProfile = await fb.usersCollection.doc(currentUser.uid).get();
      commit('setUserProfile', userProfile.data());
    },
    async removeFollowedStonk({ commit }, result) { 
      const { currentUser } = firebase.auth();
      await fb.usersCollection.doc(currentUser.uid).update({
        stonks: firebase.firestore.FieldValue.arrayRemove(result)
      });
      const userProfile = await fb.usersCollection.doc(currentUser.uid).get();
      commit('setUserProfile', userProfile.data());
    },
    async fetchUserProfile({ commit }, user) {
      commit('loadingStatus', true)
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit('setUserProfile', userProfile.data());
      commit('loadingStatus', false);
      router.push('/dashboard/stocks');
    },
    async signout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
      router.push('/');
    }
  },
  getters: {
    loadingStatus(state) {
      return state.loadingStatus;
    },
    errorMessage(state) {
      return state.errorMessage;
    }
  },
  modules: {}
});
