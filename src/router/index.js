import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todo from '@/components/pages/todo/todo.vue'
import wallet from '@/components/pages/wallet/wallet.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/todo',
      name: 'Todo',
      component: todo,
      meta: { mustAuth: true }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '*',
      name: 'Redirect',
      redirect: '/'
    }
  ]
})
