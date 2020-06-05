<template>
  <div class="flex justify-center q-pt-xl">
    <div
      class="q-pa-md "
      style="width: 500px"
    >
      <DataInput
        :itemName="'Name'"
        :itemValue="currUserData.name"
      />
      <DataInput
        :itemName="'Email'"
        :itemValue="currUserData.email"
      />
      <DataInput
        :itemName="'Password'"
        :itemValue="currUserData.passwd"
      />
      <DataInput
        :itemName="'Created Time'"
        :itemValue="currUserData.createdAt"
      />
      <div class="flex justify-center">
        <q-btn
          color="red"
          label="Delete Account"
          @click="deleteAccount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import DataInput from 'components/DataInput'

export default {
  name: 'Profile',

  components: {
    DataInput
  },

  methods: {
    deleteAccount () {
      const api = `http://localhost:3000/user/${this.currUserData.id}`
      axios.delete(api).then(response => {
        if (response.status === 200) {
          this.$store.commit('Account/CURR_USER', 'Sign In')
          this.$router.push({ path: '/' })
        }
      })
    }
  },

  computed: {
    ...mapGetters({
      currUserData: 'Account/currUserData'
    })
  },

  created () {
    this.$store.dispatch('Account/getAllUserData')
  },

  mounted () { }
}
</script>
