import axios from 'axios'

export function userSignUp (context, { name, email, passwd }) {
  const createdAt = new Date()
  const api = 'http://localhost:3000/user'
  axios.post(api, { name, email, passwd, createdAt }).then((response) => {
    if (response.status === 201) {
      this.$router.push({ path: '/SignIn' })
    }
  })
}

export function getAllUserData (context) {
  const api = 'http://localhost:3000/user'
  axios.get(api).then((response) => {
    const idArr = []
    const userName = []
    response.data.forEach((data) => {
      idArr.push(data.id)
      userName.push(data.name)
    })
    context.commit('ID_DATA', idArr)
    context.commit('ALL_USER_NAME', userName)
    context.commit('USER_DATA', response.data)
  })
}
