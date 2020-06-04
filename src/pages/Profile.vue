<template>
  <div class="flex justify-center q-pt-xl">
    <div
      class="q-pa-md "
      style="width: 500px"
    >
      <q-list
        class="q-mb-md"
        bordered
        separator
        v-for="(value, name, index) in currUserData"
        :key="index"
      >
        <q-item
          clickable
          v-ripple
          v-if="name !== 'id'"
        >
          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm">{{name}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="q-mt-sm"
              v-if="!editData"
            >{{value}}</q-item-label>
            <q-item-label
              class="q-mt-sm"
              v-if="!!editData"
            >
              <q-input
                outlined
                v-model="newData[index]"
                :dense="true"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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

export default {
  name: 'PageIndex',

  data () {
    return {
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
