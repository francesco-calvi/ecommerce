import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/home.vue'
import ProductsListFiltered from '../views/product-list-filtered.vue'
import ProductDetailComponent from '../views/product-detail-component.vue'
import LoginComponent from '../views/login-component.vue'
import SignUpComponent from '../views/sign-up-component.vue'
import CartComponent from '../views/cart-component.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: ProductDetailComponent,
    props: r => ({id: parseInt(r.params.id)})
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpComponent
  },  
  {
    path: '/cart',
    name: 'cart',
    component: CartComponent
  },
  {
    path: '/search?q=:query',
    redirectTo: 'product-list-filtered'
  },
  {
    path: '/:gender/',
    component: HomeComponent,
    props: r => ({gender: r.params.gender})
  }, 
  {
    path: '/:gender/:category/',
    name: 'product-list-filtered',
    component: ProductsListFiltered,
    props: r => ({category: r.params.category, gender: r.params.gender})
  }
]

const router = new VueRouter({
  /*mode: 'history',*/
  base: process.env.BASE_URL,
  routes
})

export default router