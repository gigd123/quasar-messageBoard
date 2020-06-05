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
        >{{itemValue}}</q-item-label>
        <q-item-label
          class="q-mt-sm"
          v-if="!!editData"
        >
          <q-input
            outlined
            v-model="newItemValue"
            :dense="true"
          />
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label
          class="q-mt-sm"
          v-if="!editData"
          @click="editData = !editData"
        >Edit</q-item-label>
        <q-item-label
          class="q-mt-sm"
          v-if="!!editData"
          @click="editData = !editData"
        >Save</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'DataInput',
  props: ['itemName', 'itemValue'],
  data () {
    return {
      editData: false
    }
  }
}
</script>
