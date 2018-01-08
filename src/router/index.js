import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Contact from '../components/Contact.vue'
import Callback from '../components/Callback.vue'

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: Contact
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})