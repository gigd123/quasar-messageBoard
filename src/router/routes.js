
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'SignUp', component: () => import('pages/SignUp.vue') },
      { path: 'SignIn', component: () => import('pages/SignIn.vue') },
      { path: 'MessageBoard', component: () => import('pages/MessageBoard.vue'), meta: { requiresAuth: true } },
      { path: 'Profile', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
