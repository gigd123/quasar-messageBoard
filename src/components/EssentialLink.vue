<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="goPage(pageName)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    pageName: {
      type: String,
      default: '/'
    },

    leftDrawerOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goPage (pageName) {
      this.$router.push({ path: `${pageName}` }, () => { })
      const newLeftDrawerOpen = !this.leftDrawerOpen
      this.$emit('newLeftDrawerOpen', newLeftDrawerOpen)
    }
  }
}
</script>
