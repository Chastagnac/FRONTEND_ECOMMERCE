<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="is-size-2 has-text-centered">  
                    {{ category.name }}
                </div>
                <div class="columns is-multiline">
                    <ProductsBox
                        v-for="product in category.products"
                        v-bind:key="product.id"
                        v-bind:product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { toast } from 'bulma-toast'
// @ = racourcie pour les components
import ProductsBox from '@/components/ProductsBox'

export default {
    name : 'Category',
    data() {
        return {
            category: {
                products: []    
            }
        };
    },
    components: {
        ProductsBox
    },
    watch: {
        $route(to, from) {
            if(to.name === 'Category') {
                this.getCategory()
            }   
        }
    },
    methods : {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug

            this.$store.commit('setIsLoading', true)

            axios
                .get(`/api/v1/products/${categorySlug}/`)
                .then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | Ilios Shop'
                })
                .catch(error => {
                    console.log(error)

                    toast({
                        message: `Quelque chose ne s'est pas passé correctement, essayez à nouveau`,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                });
                
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>

<style>
.columns.is-multiline {
    justify-content: center;
}

</style>