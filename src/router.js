import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store.js'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage,},
  { path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      const token = localStorage.getItem('token');
      if(token) {
        next()
      }else{
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})