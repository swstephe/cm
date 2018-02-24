<template lang="pug">
  header.navbar.bg-primary.p-2
    section.navbar-section
      a.btn.btn-primary.btn-action
        i.icon.icon-people
      a.navbar-brand.text-light(href='/') Ariftek Contacts &nbsp;
    section.navbar-section
      a.btn.btn-primary.tooltip.tooltip-bottom(data-tooltip="Add Contact" v-on:click='add')
        i.icon.icon-plus
      a.btn.btn-primary.tooltip.tooltip-bottom(data-tooltip="Log Out" href='/logout')
        i.icon.icon-shutdown
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'navbar',
    methods: {
      ...mapActions([
        'setContact',
        'showModal'
      ]),
      add () {
        this.setContact()
        this.showModal(2)
      }
    }
  }
</script>
