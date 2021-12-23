import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import FeedPage from '@/views/FeedPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import DiscoverPage from '@/views/DiscoverPage.vue'
import PageNotFound from '@/views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/',
    name: 'FeedPage',
    component: FeedPage
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/discover',
    name: 'DiscoverPage',
    component: DiscoverPage
  },

  // Page Not Found
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
