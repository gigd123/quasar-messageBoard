<template>
  <div class="flex justify-center q-pt-xl">
    <div
      class="q-pa-md"
      style="width: 400px"
    >

      <q-form
        @submit="signIn"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="userAccount"
          label="Your account *"
          hint="your account"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your account']"
        />

        <q-input
          type="password"
          filled
          v-model="password"
          label="Your password *"
          hint="type your passwords"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your password']"
        />

        <div class="flex justify-center">
          <q-btn
            label="SignIn"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Sign Up"
            @click="goSignUp"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SignIn',

  data () {
    return {
      userAccount: '',
      password: '',
      hasMatchAccount: false
    }
  },

  methods: {
    signIn () {
      this.userData.forEach((data) => {
        if (data.name === this.userAccount) {
          if (data.passwd === this.password) {
            this.$router.push({ path: '/MessageBoard' }).catch(err => console.log('all good', err))
            this.$store.commit('Account/CURR_USER', data.name)
            this.$store.commit('Account/CURR_USER_ID', data.id)
            this.$store.commit('Account/CURR_USER_DATA', data)
            this.hasMatchAccount = true
          }
        }
      })
      this.hasMatchAccount === false ? this.alert() : this.hasMatchAccount = true
    },
    goSignUp () {
      this.$router.push({ path: '/SignUp' })
    },
    alert () {
      this.$q.dialog({
        title: 'Mistake',
        message: 'The account or password is wrong, please try again!'
      })
    }
  },

  computed: {
    getText () {
      return 'primeplus'
    },
    ...mapGetters({
      userData: 'Account/userData'
    })
  },

  created () {
    this.$store.dispatch('Account/getAllUserData')
  },

  mounted () { }
}
</script>
