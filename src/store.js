import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth.js';
import globalAxios from 'axios';
import router from './router';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    userEmail: null,
    userKey : null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
      state.userEmail = userData.email;
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null
    },
    loadBets(state, mybets){
      state.placedBets = mybets;
    }
  },
  actions: {
    placebet({commit, state}, betsData){
      if (!state.idToken) {
        return
      }
      globalAxios.post('/bets.json' + '?auth=' + state.idToken, betsData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    pendingBets({commit, state}, betData){
      globalAxios.get('/bets.json'+ '?auth=' + state.idToken)
        .then(res => {
          let data = res.data;
          let dataId = [];
          for(let key in data){
            if(betData.key === key){
              globalAxios.put('https://vue-auth-e395c.firebaseio.com/bets/'+ betData.key + '.json?auth=' + state.idToken, betData.matchData)
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                })
            }
          }


        });

    },
    setLogoutTimer({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup({commit, dispatch}, authData) {
      let setUserName = authData.firstName;
      localStorage.setItem('userName', setUserName);

      axios.post('/signupNewUser?key=AIzaSyAjiWKp_fAJSEEnKTnEBthYPw_SXeaBtR8', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            email: res.data.email,
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expireIn', expirationDate);
          dispatch('storeUser', authData);
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/dashboard')
        })
        .catch(error => console.log(error))
    },
    autoLogin({commit}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expireIn');
      const now = new Date();
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token: token,
        userId: userId
      })

    },
    login({commit, dispatch}, authData) {
      let setUserName = authData.getFirstName[0];
      localStorage.setItem('userName', setUserName);
      axios.post('/verifyPassword?key=AIzaSyAjiWKp_fAJSEEnKTnEBthYPw_SXeaBtR8', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expireIn', expirationDate);
          console.log('Res Data',res.data);
          commit('authUser', {
            email: res.data.email,
            token: res.data.idToken,
            userId: res.data.localId,
            userKey: res.data
          });
          dispatch('setLogoutTimer', res.data.expiresIn);
          router.replace('/dashboard')
        })
        .catch(error => console.log(error))
    },
    logout({commit}) {
      commit('clearAuthData');
      localStorage.removeItem('expireIn');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      router.replace('/signin')
    },
    storeUser({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user)
          }
          commit('storeUser', users)
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    sendToken(state){
      return state.idToken
    },
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.idToken !== null
    }
  }
})

