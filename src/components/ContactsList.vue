<template>
    <div class="panel">
      <ul class="menu-list">
        <router-link v-for="contact of contacts" :key="contact.id"
          :to="{name: 'contact', params: {id: contact.id}}"
          append
          class="panel-block"
        >
          <h4>{{ contact.first }} {{ contact.last }}</h4>
          <p>{{ contact.email }}</p>
        </router-link>
      </ul>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "contacts-list",
    computed: {
      ...mapGetters([
        'contacts'
      ])
    },
    created () {
      this.getContacts()
    },
    methods: {
      ...mapActions([
        'getContacts'
      ])
    }
  }
</script>
