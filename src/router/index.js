import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/helpers/cookie'
import MyProjects from '../views/MyProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectPageEditorView from '../views/ProjectPageEditorView.vue'
import ProjectPagePreviewView from '../views/ProjectPagePreviewView.vue'
import LoginView from '@/views/LoginView.vue'
import { useProjectsStore } from '@/stores/projects'
import { usePagesStore } from '@/stores/pages'

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

  const projectsStore = useProjectsStore()
  projectsStore.setCurrentId(to.params.id || 1)
  const pagesStore = usePagesStore()
  pagesStore.setCurrentId(to.params.pageId || 1)
})

export default router

function isAuthenticated() {
  return !!getCookie('access-token')
}
