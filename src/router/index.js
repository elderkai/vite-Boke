import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/manage/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: 'Dome1'
    }
  },
  {
    path:"/",
    component:()=>import("../views/layout.vue"),
    meta:{
      title:"/"
    },
  children:[
      {
        path:"/",
        component:()=>import("../views/home.vue")
        ,children:[
         {path:"/",
         component:()=>import("../views/articleList.vue")
        }, 
         {path:"/article",
         component:()=>import("../views/article.vue")
        },
        {
          path:"/home",
          component:()=>import("../views/index.vue")
        },
        {
          path:"/timeSort",
          component:()=>import("../views/timeSort.vue")
        },
        {
          path:"/course",
          component:()=>import("../views/course.vue")
        },
        {
          path:"/message",
          component:()=>import("../views/message.vue")
        },
        {
          path:"/project",
          component:()=>import("../views/project.vue")
        },
        {
          path:"/about",
          component:import("../views/about.vue")
        } 
        ]
      }
    ]
  },
  {
    path:"/manage",
    redirect:"/manage/user",
    component:()=>import("../views/manage/layout.vue"),
    children:[
      {
        path:"user",
        component:()=>import('../views/manage/user.vue')
      },
      {
        path:"article",
        component:()=>import('../views/manage/article.vue')
      },
      {
        path:"editArticle",
        component:()=>import("../views/manage/addArticle.vue")
      },
      {
        path:"label",
        component:()=>import("../views/manage/label.vue")
      },
    
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})


export default router