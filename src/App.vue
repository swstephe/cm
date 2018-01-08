<template>
  <div class="container">
    <nav class="navbar" role="navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item brand-text">
          <i class="fa fa-user"></i>
          &nbsp;
          <span>{{ title }}</span>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a v-if="isAuthenticated" @click="login" class="navbar-item">Log In</a>
          <a v-else @click="logout" class="navbar-item">Log Out</a>
        </div>
      </div>
    </nav>

    <div class="container">
      <header>{{ title }}</header>
    <!--
      <loading-indicator :loading="isNavigating || isRequesting"></loading-indicator>
    -->
      <div class="columns">
        <contacts-list class="column is-one-third"></contacts-list>
        <router-view class="column is-two-thirds"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ContactsList from './components/ContactsList'

  export default {
    name: "app",
    data () {
      return {
        isNavigating: false,
        title: 'Contacts'
      }
    },
    components: {
      'contacts-list': ContactsList
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'isRequesting'
      ])
    },
    methods: {
      ...mapActions([
        'login',
        'logout'
      ])
    }
  }
</script>
