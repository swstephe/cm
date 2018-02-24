<template lang="pug">
  .modal.active
    a.modal-overlay(@click='cancel' aria-label='Close')
    .modal-container
      .modal-header
        h3
          | Edit Contact
          button.btn.btn-link.float-right(@click='cancel')
            i.icon.icon-cross
      .modal-body
        table
          tbody
            tr
              td
                figure.avatar.avatar-lg(:data-initial='buffer.initials')
              td
                input.form-input(type='text' v-model='buffer.first' placeholder="First")
              td
                input.form-input(type='text' v-model='buffer.last' placeholder="Last")
            tr
              td(colspan=2) &nbsp;
            tr(v-for='(phone, index) in buffer.phones')
              th(v-if='index===0' v-bind:rowspan='buffer.phones.length + 1')
                h5 &#9742;
              td
                input.form-input(type='text' v-model='phone.value' placeholder="Phone")
            tr
              th(v-if='buffer.phones.length === 0')
                h5 &#9742;
              td(colspan=2)
                i.icon.icon-plus(@click='addPhone')
            tr(v-for='(email, index) in buffer.emails')
              td(v-if='index === 0' v-bind:rowspan='buffer.emails.length + 1')
                i.icon.icon-mail
              td
                input.form-input(type='email' v-model='email.value' placeholder="Email")
            tr
              th(v-if='buffer.emails.length === 0')
                i.icon.icon-mail
              td(colspan=2)
                i.icon.icon-plus(@click='addEmail')

      .modal-footer
        button.btn.btn-link(@click='cancel') Cancel
        button.btn.btn-link(:class='{disabled: !isDirty}' v-on:click='save') Save
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Contact } from '../model/contact'

  export default {
    name: 'edit-contact',
    computed: {
      ...mapGetters([
        'contact',
        'contacts',
        'show'
      ]),
      isDirty () {
        return this.buffer.first !== ""
          || this.buffer.last !== ""
        ;
      }
    },
    data () {
      return {
        buffer: new Contact()
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      ...mapActions([
        'showModal',
        'addContact',
        'updateContact',
      ]),
      clear () {
        this.buffer.clear()
      },
      addPhone() {
        this.buffer.phones.push({value: ''})
      },
      addEmail() {
        this.buffer.emails.push({value: ''})
      },
      cancel () {
        this.clear()
        this.showModal(0)
      },
      save () {
        let contact = new Contact(this.buffer)
        if (contact.id) {
          this.updateContact(contact)
        } else {
          this.addContact(contact)
        }
        this.showModal(0)
      }
    },
    created () {
      this.buffer.copy(this.contact)
    }
  }
</script>
