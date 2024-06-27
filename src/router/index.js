import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/helpers/cookie'
import MyProjects from '../views/MyProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectPageEditorView from '../views/ProjectPageEditorView.vue'
import ProjectPagePreviewView from '../views/ProjectPagePreviewView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'my-projects',
      component: MyProjects
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectView
    },
    {
      path: '/project/:id/edit-page/:pageId',
      name: 'project-page-editor',
      component: ProjectPageEditorView
    },
    {
      path: '/project/:id/preview-page/:pageId',
      name: 'project-page-preview',
      component: ProjectPagePreviewView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from) => {
  const isAuth = isAuthenticated()
  if (to.name !== 'login' && !isAuth) {
    return { name: 'login' }
  } else if (to.name === 'login' && isAuth) {
    return { name: 'my-projects' }
  }
})

export default router

function isAuthenticated() {
  return !!getCookie('access-token')
}
