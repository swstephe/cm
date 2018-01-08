<template>
  <div class="has-text-centered">
    <h2 class="title">{{ message }}</h2>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "home",
    computed: mapGetters([
      'isAuthenticated',
      'user',
      'contacts'
    ]),
    data () {
      return {
        message: "Please Select a Contact."
      }
    },
    methods: {
      ...mapActions([
        'getContacts'
      ])
    },
    mounted () {
      if (this.isAuthenticated) {
        this.getContacts()
      }
    }
  }
</script>
