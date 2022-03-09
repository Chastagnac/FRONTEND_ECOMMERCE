import { createStore } from 'vuex'

export default createStore({
    state: {
        cart: {
            items: [],
        },
        isAuthenticated: false,
        isAdmin: false,
        token: '',
        isLoading: false,
    },
    mutations: {
        // Si le localstorage n'a pas 'cart' en key, il l'add
        initializeStore(state) {
            if(localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart'))
            } else {
                localStorage.setItem('cart',JSON.stringify(state.cart))
            } 

            if(localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true 
            } else {
                state.token = ''
                state.isAuthenticated = false
                state.isAdmin = false
            }
        },
        addToCart(state, item) {
            // Vérifie que l'item qu'on essaye d'ajouter existe ou pas dans le panier
            const exists = state.cart.items.filter(i => i.product.id === item.product.id)

            if(exists.length) {
                exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
            } else {
                state.cart.items.push(item)
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        setIsLoading(state, status) {
            state.isLoading = status
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        },
        isAuthenticated() {
            return state.isAuthenticated
        },
        isCookie() {
            const str = document.cookie[31]
            if(str === "a") {    
                state.isCookie = true
            } else {
                state.isCookie = false
            }
            return str
        },
        setAdmin() {
            this.state.isAdmin = true
        },
        clearCart(state) {
            state.cart = { items: [] }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    actions: {
    },
    modules: {
    }
})
