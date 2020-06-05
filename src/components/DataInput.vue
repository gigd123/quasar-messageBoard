<template>
  <q-list
    class="q-mb-md"
    bordered
    separator
  >
    <q-item
      clickable
      v-ripple
    >
      <q-item-section class="col-3">
        <q-item-label class="q-mt-sm">{{itemName}}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label
          class="q-mt-sm"
          v-if="!editData"
        >{{itemName === 'Password' ? hidePassword : itemValue}}</q-item-label>
        <q-item-label
          class="q-mt-sm"
          v-if="!!editData"
        >
          <q-input
            outlined
            v-if="itemName !== 'Password'"
            v-model="newItemValue"
            :dense="true"
          />
          <q-input
            class="q-mb-xs"
            outlined
            v-if="itemName === 'Password'"
            type="password"
            v-model="oldPassword"
            :dense="true"
            placeholder="Type original password"
          />
          <q-input
            class="q-mb-xs"
            outlined
            v-if="itemName === 'Password'"
            type="password"
            v-model="newPassword"
            :dense="true"
            placeholder="New password"
          />
          <q-input
            outlined
            v-if="itemName === 'Password'"
            type="password"
            v-model="newItemValue"
            :dense="true"
            placeholder="Type New password again"
          />
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label
          class="q-mt-sm"
          v-if="!editData && itemName !== 'Created Time'"
          @click="editData = !editData"
        >Edit</q-item-label>
        <q-item-label
          class="q-mt-sm"
          v-if="!!editData"
          @click="editData = !editData"
        >Cancel</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label
          class="q-mt-sm"
          v-if="!!editData"
          @click="updateAccount"
        >Save</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'DataInput',
  props: ['itemName', 'itemValue'],
  data () {
    return {
      editData: false,
      newItemValue: '',
      oldPassword: '',
      newPassword: ''
    }
  },

  computed: {
    ...mapGetters({
      currUserData: 'Account/currUserData'
    }),
    hidePassword () {
      return this.itemName === 'Password' ? '*'.repeat(this.itemValue.length) : '**********'
    }
  },

  methods: {
    updateAccount () {
      const keyName = this.itemName === 'Name' ? 'name' : this.itemName === 'Password' ? 'passwd' : 'email'
      if (keyName === 'passwd') {
        if (this.oldPassword !== this.itemValue) {
          this.oldPasswdAlert()
          return
        }
        if (this.newPassword !== this.newItemValue) {
          this.newPasswdAlert()
          return
        }
      }
      this.editData = !this.editData
      const api = `http://localhost:3000/user/${this.currUserData.id}`
      axios.patch(api, {
        [keyName]: this.newItemValue
      }).then(response => {
        const newUserData = Object.assign({}, this.currUserData)
        newUserData[keyName] = this.newItemValue
        if (keyName === 'name') { this.$store.commit('Account/CURR_USER', newUserData.name) }
        this.$store.commit('Account/CURR_USER_DATA', newUserData)
      })
    },
    oldPasswdAlert () {
      this.$q.dialog({
        title: 'Password Mistake',
        message: 'The original password is wrong, please try again!'
      })
    },
    newPasswdAlert () {
      this.$q.dialog({
        title: 'Password Mistake',
        message: 'The new passwords aren\'t matched, please try again!'
      })
    }
  }
}
</script>
