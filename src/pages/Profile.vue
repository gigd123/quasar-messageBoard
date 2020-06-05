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
      <div class="flex justify-between">
        <q-btn
          color="primary"
          label="Edit Account"
          v-if="!editData"
          @click="editData = !editData"
        />
        <q-btn
          color="red"
          label="Delete Account"
          v-if="!editData"
          @click="deleteAccount"
        />
        <q-btn
          color="primary"
          label="Cancel"
          v-if="!!editData"
          @click="editData = !editData"
        />
        <q-btn
          color="primary"
          label="Save"
          v-if="!!editData"
          @click="updateAccount"
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

  data () {
    return {
      newData: '',
      newData0: '',
      newData1: '',
      newData2: '',
      editData: false
    }
  },

  methods: {
    deleteAccount () {
      const api = `http://localhost:3000/user/${this.currUserData.id}`
      axios.delete(api).then(response => {
        console.log('delete successfully')
      })
    },
    updateAccount () {
      this.editData = !this.editData
      console.log(this.newData0)
      console.log(this.newData1)
      console.log(this.newData2)
      const api = `http://localhost:3000/user/${this.currUserData.id}`
      axios.patch(api, {
        name: this.newData0,
        email: this.newData1,
        passwd: this.newData2
      }).then(response => {
        console.log(response)
      })
    }
  },

  computed: {
    ...mapGetters({
      currUserData: 'signUpIn/currUserData'
    })
  },

  created () {
    this.$store.dispatch('signUpIn/getAllUserData')
  },

  mounted () { }
}
</script>
