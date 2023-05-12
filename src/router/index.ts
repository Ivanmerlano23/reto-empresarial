import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/delete-order',
      name: 'delete-order',
      component: () => import('../views/crud-medical-order/DeleteMedicalOrder.vue')
    },
    {
      path: '/update-order',
      name: 'update-order',
      component: () => import('../views/crud-medical-order/UpdateMedicalOrder.vue')
    },
    {
      path: '/read-order',
      name: 'read-order',
      component: () => import('../views/crud-medical-order/ReadMedicalOrder.vue')
    },
    {
      path: '/medicamentos',
      name: 'medicines',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Medicines.vue')
    },
    {
      path: '/delete-medicine',
      name: 'delete-medicine',
      component: () => import('../views/crud-medicines/DeleteMedicine.vue')
    },
    {
      path: '/update-medicine',
      name: 'update-medicine',
      component: () => import('../views/crud-medicines/UpdateMedicine.vue')
    },
    {
      path: '/read-medicine',
      name: 'read-medicine',
      component: () => import('../views/crud-medicines/ReadMedicine.vue')
    }
  ]
})

export default router
