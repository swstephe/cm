<template>
  <div class="panel">
    <div class="panel-heading">
      <h3 class="title">Profile</h3>
    </div>
    <div class="panel-block">
      <form role="form" class="control">
        <div class="field is-horizontal">
          <div class="field-label">
            <label for="first" class="label">First Name</label>
          </div>
          <div class="field-body">
             <div class="field">
                <div class="control is-expanded">
                  <input type="text" id="first" class="input" :value="contact.first">
                </div>
             </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label for="last" class="label">Last Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input type="text" id="last" class="input" :value="contact.last">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label for="email" class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" id="email" class="input" :value="contact.email">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label for="phone" class="label">Phone Number</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control"></div>
              <input type="text" id="phone" class="input" :value="contact.phone">
             </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
             <div class="field">
               <div class="control">
                <button class="button is-primary" @click="save" :disabled="canSave">Save</button>
               </div>
             </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "contact",
    data () {
      return {
        'loading': false
      }
    },
    computed: {
      ...mapGetters([
        'contact',
        'error'
      ]),
      canSave () {
        return false
      }
    },
    mounted () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      ...mapActions([
        'getContact'
      ]),
      fetchData () {
        this.loading = true
        this.getContact(this.$route.params.id)
      },
      save () {
        return true
      }
    }
  }
</script>
