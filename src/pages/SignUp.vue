<template>
  <div class="flex justify-center q-pt-xl">
    <div
      class="q-pa-md "
      style="width: 400px"
    >

      <q-form
        @submit="signUp"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="name"
          label="Your Account *"
          hint="your account"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your account' ]"
        />

        <q-input
          filled
          v-model="email"
          label="Your email *"
          hint="your email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your email']"
        />

        <q-input
          type="password"
          filled
          v-model="passwd"
          label="Your password *"
          hint="type your passwords"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your password']"
        />

        <q-input
          type="password"
          filled
          v-model="checkPassword"
          label="Type Your password again *"
          hint="type your password again"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your password again']"
        />

        <div class="flex justify-center">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Sign In"
            @click="goSignIn"
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
  name: 'PageIndex',

  data () {
    return {
      name: 'leo123',
      email: 'leo@gmail.com',
      passwd: '12345',
      checkPassword: '12345'
    }
  },

  methods: {
    signUp () {
      const name = this.name
      const email = this.email
      const passwd = this.passwd
      this.$store.dispatch('signUpIn/userSignUp', { name, email, passwd })
    },
    goSignIn () {
      this.$router.push({ path: '/SignIn' })
    }
  },

  computed: {
    getText () {
      return 'primeplus'
    },
    ...mapGetters({
      idData: 'signUpIn/idData',
      allUserName: 'signUpIn/allUserName'
    })
  },

  created () {
    this.$store.dispatch('signUpIn/getAllUserData')
  },

  mounted () { }
}
</script>
