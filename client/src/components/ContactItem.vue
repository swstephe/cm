<template lang="pug">
  tr.c-hand(@click='show(contact)')
    td
      figure.avatar.avatar-lg(:data-initial='contact.initials')
    td {{ contact.first }} {{ contact.last }}
    td
      span(v-if='contact.emails && contact.emails.length > 0')
        a.tooltip.tooltip-bottom(data-tooltip="Send email" v-bind:href="'mailto:' + contact.emails") {{ contact.emails[0].value }}
    td
      span(v-if='contact.phones && contact.phones.length > 0') {{ contact.phones[0].value }}
      span(v-else) {{ contact.name }}
    td
      button.btn.btn-link.tooltip(data-tooltip="Edit contact" v-on:click.stop='edit(contact)')
        i.icon.icon-edit
      button.btn.btn-link.tooltip(data-tooltip="Delete contact" v-on:click.stop='deleteContact(contact)')
        i.icon.icon-delete
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'contact-item',
  methods: {
    ...mapActions([
      'deleteContact',
      'setContact',
      'showModal'
    ]),
    edit (contact) {
      this.setContact(contact)
      this.showModal(2)
    },
    show (contact) {
      this.setContact(contact)
      this.showModal(1)
    }
  },
  props: [
    'contact'
  ]
}
</script>
