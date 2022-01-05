import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Shop from '../views/Shop.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        name: 'Search',
        component : Search
    },
    {
        path: '/myaccount',
        name: 'MyAccount',
        component : MyAccount,
        meta : {
            requireLogin: true
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component : Cart
    },
    {    
        path: '/sign-up',
        name: 'SignUp',
        component : SignUp
    },
    {    
        path: '/log-in',
        name: 'Log-In',
        component : LogIn
    },
    {
        path: '/shop/:category_slug',
        name: 'Category',
        component: Category
    },
    {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component : Product
    },
    {
        path: '/shop',
        name: 'Shop',
        component : Shop
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({name: 'LogIn', query: { to: to.path}})        
    } else {
        next()
    }
})

export default router
