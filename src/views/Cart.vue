<template>
    <div class="page-cart" style="margin : 20px">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Panier</h1>
            </div>
            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="true"> 
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem
                        v-for="item in cart.items"
                        v-bind:key="item.product.id"
                        v-bind:initialItem="item" 
                        v-on:removeFromCart="removeFromCart"/>
                    </tbody>
                </table>

                <p v-else>Aucun article dans le panier ..  <a href="/" class="is-italic">Voir les nouveautés ?</a></p><br>
                <div class="column is-12 box">
                    <h2 class="subtitle">
                        Summary
                    </h2>
                    <strong>$ {{ cartTotalPrice.toFixed(2) }}</strong>, {{cartTotalLenght}} items

                    <hr>

                    <router-link to="/checkout" class="button is-dark">Procéder au paiement</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem'

export default {
    name : 'Cart',
    data() {
        return {
            cart: {
                items : []
            }
        }
    },
    components: {
        CartItem
    },
    // Quand l'app est "montée" on recupère $cart du store dans this.cart
    mounted() {
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        cartTotalLenght() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
               return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        }
    }
}
</script>