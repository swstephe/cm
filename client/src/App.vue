<template lang="pug">
  main
    navbar
    .container.grid-lg
      .columns
        contact-list.col-12
    show-contact(v-if='modal === 1')
    edit-contact(v-if='modal === 2')
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from './components/Navbar.vue'
import ContactList from './components/ContactList.vue'
import ShowContact from './components/ContactShow.vue'
import EditContact from './components/ContactEdit.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    ContactList,
    ShowContact,
    EditContact
  },
  computed: {
    ...mapGetters([
      'isRequesting',
      'modal'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style>
  .navbar {
    height: 60px;
  }
</style>
