import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
     {
          path: '/demo1',
          name: 'taskList',
          component(resolve){
              require(['../components/taskList/taskList'],resolve);
          }
      },
  ]
})
