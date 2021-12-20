<template>
    <transition-group name="bounce" appear>
        <tr v-if="visible" v-bind:class="{ isBG: has-background-light }">
            <td><router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link></td>
            <td>${{ item.product.price }}</td>
            <td>
                <a @click="decrementQuantity(item)">-</a>
                    {{ item.quantity }}
                <a @click="incrementQuantity(item)">+</a>    
            </td>
            <td>${{ getItemTotal(item).toFixed(2) }}</td> 
            <td><button class="delete" @click="removeFromCart(item)"></button></td>
        </tr>
    </transition-group>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem : Object
    },
    data() {
        return {
            item: this.initialItem,
            isBG: true,
            visible : true
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        incrementQuantity(item) {
            item.quantity += 1

            this.updateCart()
        },
        decrementQuantity(item) {
            item.quantity -= 1  
            if(item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.visible = false
            setTimeout(() => {
                this.$emit('removeFromCart', item)
                this.updateCart()
            }, 1000);
        }
    }
}
</script>

<style>
    .bounce-leave-active {
        animation: bounce-in 1s;
    }

    @keyframes bounce-in {
    0% {
        
    }
    100% {
    }
}
</style>
