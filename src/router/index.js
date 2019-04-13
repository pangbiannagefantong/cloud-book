import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  routes: [
    { 
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/index')
        },
        {
          path: 'study',
          name: 'study',
          meta: {
            title: '我的学习'
          },
          component: () => import('@/views/study')
        },
        {
          path: 'person',
          name: 'person',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/person')
        }
      ]
      
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('@/views/details'),
      meta: {
        title: '书籍详情'
      }
    },
    {
      path: '/titles/:id',
      name:'titles',
      component: () => import('@/views/titles'),
      meta: {
        title: '目录'
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/views/article'),
      meta: {
        title: '文章内容'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/changePersonMsg',
      name: 'changePersonMsg',
      component: () => import('@/views/changePersonMsg'),
      meta: {
        title: '修改个人信息'
      }
    },
    {
      path: '/changePersonName',
      name: 'changePersonName',
      component: () => import('@/views/changePersonName'),
      meta: {
        title: '修改昵称'
      }
    },
    {
      path: '/changePersonPassword',
      name: 'changePersonPassword',
      component: () => import('@/views/changePersonPassword'),
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/changePersonDesc',
      name: 'changePersonDesc',
      component: () => import('@/views/changePersonDesc'),
      meta: {
        title: '修改个性签名'
      }
    },
    {
      path: '/collectBook',
      name: 'collectBook',
      component: () => import('@/views/collectBook'),
      meta: {
        title: '收藏的书籍'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test'),
      meta: {
        title: '测试页面'
      }
    },
  ]
})

router.beforeEach((to,from,next)=>{
  let title = to.meta.title
  document.title = title
  next()
})

export default router
