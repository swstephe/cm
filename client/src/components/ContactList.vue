<template lang="pug">
  table.table-striped.table-hover
    tbody
      contact-item(
        v-for='contact in contactsList()'
        v-bind:key='contact.id'
        v-bind:contact='contact'
      )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ContactItem from './ContactItem.vue'

export default {
  name: 'contact-list',
  components: {
    ContactItem
  },
  computed: {
    ...mapGetters([
       'contacts',
       'user',
     ])
  },
  methods: {
    ...mapActions([
      'getContacts'
    ]),
    contactsList () {
      return this.contacts
        .map((elem, index) => {
          elem.index = index
          return elem
        })
        .sort((a, b) => a.compare(b))
    }
  },
  created () {
    this.getContacts()
  }
}
</script>
