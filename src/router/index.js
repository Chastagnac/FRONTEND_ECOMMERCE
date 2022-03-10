import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Service from '../views/Service.vue'
import Devis from '../views/Devis.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import Conditions from '../views/Conditions.vue'
import DevisClients from '../views/DevisClients.vue'
import DevisView from '../views/DevisView.vue'
import Contact from '../views/Contact.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Shop from '../views/Shop.vue'
import Checkout from '../views/Checkout.vue'
import store from '../store'
import Tuto from '../views/Tutoriel.vue'
import PasswordReset from '../views/passwordreset'
import Success from '../views/Success.vue'
import Commandes from '../views/Commandes'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    },
    {
        path: '/password-reset',
        name: 'passwordreset',
        component: PasswordReset
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
    },
    {
        path: '/commandes',
        name: 'Commandes',
        component: Commandes
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    },
    {
        path: '/cart/success',
        name: 'Success',
        component: Success
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/devis-clients',
        name: 'DevisClients',
        component: DevisClients
    },
    {
        path: '/devis-clients/:id',
        name: 'DevisView',
        component: DevisView
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/log-in',
        name: 'Log-In',
        component: LogIn
    },
    {
        path: '/shop/:category_slug',
        name: 'Category',
        component: Category
    },
    {
        path: '/service',
        name: 'Service',
        component: Service
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/conditions-generales',
        name: 'Conditions',
        component: Conditions
    },
    {
        path: '/service/devis',
        name: 'Devis',
        component: Devis
    },
    {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component: Product
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/tutoriel',
        name: 'Tuto',
        component: Tuto
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({ name: 'LogIn', query: { to: to.path } })
    } else {
        next()
    }
})

export default router