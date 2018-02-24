<template lang="pug">
  .modal.active
    a.modal-overlay(@click='showModal(0)' aria-label='Close')
    .modal-container
      .modal-header
        figure.avatar.avatar-lg(:data-initial='contact.initials')
        | &nbsp; {{ contact.first }} {{ contact.last }}
        button.btn.btn-clear.float-right(@click='showModal(0)' aria-label='Close')
      .modal-body
        h5 Contact details
        table
          tbody
            tr(v-for='(phone, index) in contact.phones')
              th(v-if='index === 0' v-bind:rowspan='contact.phones.length')
                h5 &#9742;
              td {{ phone.value }}
            tr(v-for='(email, index) in contact.emails')
              th(v-if='index === 0' v-bind:rowspan='contact.emails.length'): i.icon.icon-mail
              td: a(:href='"mailto:" + email.value') {{ email.value }}
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'show-contact',
    computed: {
      ...mapGetters([
        'contact',
        'contacts',
        'modal'
      ])
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      ...mapActions([
        'getContact',
        'showModal'
      ])
    }
  }
</script>
