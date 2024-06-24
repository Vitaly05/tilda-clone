import { createRouter, createWebHistory } from 'vue-router'
import MyProjects from '../views/MyProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectPageEditorView from '../views/ProjectPageEditorView.vue'
import ProjectPagePreviewView from '../views/ProjectPagePreviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'my projects',
      component: MyProjects
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectView
    },
    {
      path: '/project/:id/edit/page',
      name: 'project page editor',
      component: ProjectPageEditorView
    },
    {
      path: '/project/:id/preview/page',
      name: 'project page preview',
      component: ProjectPagePreviewView
    }
  ]
})

export default router
