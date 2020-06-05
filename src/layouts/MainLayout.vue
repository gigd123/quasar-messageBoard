<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          prime
        </q-toolbar-title>

        <div
          class="userAccount"
          @click="logOutOverlay = !logOutOverlay"
        >
          {{currUser}}
          <div
            class="logOut bg-white"
            v-if="currUser !== 'Sign In' && currUser !== '' && logOutOverlay === true"
          >
            <q-btn
              outline
              color="primary"
              label="Log Out"
              style="width:100px"
              @click="logOut"
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      v-if="currUser !== 'Sign In' && currUser !== ''"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :leftDrawerOpen="leftDrawerOpen"
          @newLeftDrawerOpen="switchLeftDrawerOpen"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      logOutOverlay: false,
      essentialLinks: [
        {
          title: 'Message Board',
          icon: 'comment',
          pageName: '/MessageBoard'
        },
        {
          title: 'Profile',
          icon: 'account_circle',
          pageName: '/Profile'
        }
      ]
    }
  },
  methods: {
    logOut () {
      this.$store.commit('Account/CURR_USER', 'Sign In')
      this.$router.push({ path: '/' })
    },
    switchLeftDrawerOpen () {
      this.leftDrawerOpen = false
    }
  },
  computed: {
    ...mapGetters({
      currUser: 'Account/currUser'
    })
  }
}
</script>

<style lang="sass">
.userAccount
  position: relative
  cursor: pointer

.logOut
  position: absolute
  bottom: -55px
  z-index: 10
  right: 0
</style>
