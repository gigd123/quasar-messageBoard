<template>
  <div>
    <template>
      <div class="q-ma-lg">
        <div class="header flex justify-between q-mb-sm">
          <h6 class="message-board q-ma-xs">
            Message Board
          </h6>
          <q-btn
            color="primary"
            label="Create new title"
            @click="visibility = !visibility"
          />
        </div>
        <q-list
          bordered
          class="rounded-borders"
          v-for="item in newMessageBoard"
          :key="item.id"
        >
          <q-expansion-item
            class="bg-primary text-white"
            expand-separator
            :label="item.subject"
          >
            <q-card>
              <q-card-section class="bg-grey-3 text-black">
                <span class="text-body1">{{item.content}}</span>
                <br>
                <br>
                <br>
                <span class="text-caption">{{!!item.name ? item.name : 'This account has already been removed!'}} {{item.createdAt}}</span>
              </q-card-section>
            </q-card>
            <q-list
              bordered
              separator
              class="bg-white text-black"
            >
              <q-item
                clickable
                v-ripple
                v-for="message in item.response"
                :key="message.id"
              >
                <q-item-section>{{message.content}}</q-item-section>
                <q-item-label caption>{{message.name}} {{message.createdAt}}</q-item-label>
              </q-item>
            </q-list>
            <div
              class="q-gutter-md bg-white text-black"
              :key="item.id"
            >
              <q-item-section :class="{hidden: showCommentInput === true}">
                <q-btn
                  outline
                  color="primary"
                  label="Add Comment"
                  @click="showCommentInput = !showCommentInput"
                />
              </q-item-section>
              <q-input
                class="hidden"
                :class="{showCommentInput: showCommentInput === true}"
                outlined
                v-model="newComment"
                label="Comment"
                @keyup.enter="addComment(item.id)"
              />
            </div>
          </q-expansion-item>
        </q-list>
      </div>
      <div
        class="fit overlay grey-8 invisible flex justify-center items-center"
        :class="{visibility: !!visibility}"
      >
        <div
          class="q-pa-md white"
          style="width: 40%"
        >
          <q-input
            class="q-mb-sm"
            outlined
            v-model="subject"
            label="Subject"
          />
          <q-input
            class="q-mb-sm"
            v-model="content"
            filled
            type="textarea"
          />
          <div class="flex justify-between">
            <q-btn
              color="primary"
              label="cancel"
              @click="visibility = !visibility"
            />
            <q-btn
              color="primary"
              label="Add title"
              @click="addTitle"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'MessageBoard',

  data () {
    return {
      userAccount: '',
      password: '',
      messageBoard: [],
      visibility: false,
      subject: 'subject',
      content: 'content',
      messageResponse: [],
      newComment: '',
      showCommentInput: false
    }
  },

  methods: {
    getMessageBoard () {
      const api = 'http://localhost:3000/messageBoard'
      axios.get(api).then((response) => {
        this.messageBoard = response.data
      })
    },
    getMessageResponse () {
      const api = 'http://localhost:3000/response'
      axios.get(api).then((response) => {
        this.messageResponse = response.data
      })
    },
    addTitle () {
      const api = 'http://localhost:3000/messageBoard'
      const createdAt = new Date()
      const subject = this.subject
      const content = this.content
      const createdUser = this.currUserId
      axios.post(api, { createdAt, subject, content, createdUser }).then((response) => {
        if (response.status === 201) {
          this.visibility = !this.visibility
        }
      })
      this.getMessageResponse()
      this.getMessageBoard()
    },
    addComment (id) {
      const api = 'http://localhost:3000/response'
      const createdAt = new Date()
      const content = this.newComment
      const createdUser = this.currUserId
      const messageBoardId = id
      axios.post(api, { messageBoardId, createdAt, content, createdUser }).then(response => {
        if (response.status === 201) {
          alert('added successfully')
          this.newComment = ''
          this.getMessageResponse()
          this.getMessageBoard()
        }
      })
    }
  },

  computed: {
    ...mapGetters({
      currUser: 'Account/currUser',
      currUserId: 'Account/currUserId',
      userData: 'Account/userData'
    }),
    newMessageBoard () {
      return this.messageBoard.map(item => {
        this.userData.forEach(data => {
          if (data.id === item.createdUser) {
            item.name = data.name
          }
        })
        item.response = []
        this.messageResponse.forEach(message => {
          this.userData.forEach(data => {
            if (data.id === message.createdUser) {
              message.name = data.name
            }
          })
          if (message.messageBoardId === item.id) {
            item.response.push(message)
          }
        })
        return item
      })
    }
  },

  created () {
    this.$store.dispatch('Account/getAllUserData')
    this.getMessageResponse()
    this.getMessageBoard()
  },

  mounted () { }
}
</script>

<style lang="sass">
.overlay
  position: fixed
  top: 0
  z-index: 10
  background-color: rgba(0,0,0,0.8)

.visibility
  visibility: visible !important

.white
  background-color: white
.showCommentInput
  display: block !important
</style>
