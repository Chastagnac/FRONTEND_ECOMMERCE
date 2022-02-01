<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Recherchez</h1>
                <h2 class="is-size-5 has-text-grey">Resultats pour : "{{ query }}"</h2>

                <ProductsBox 
                    v-for="product in products"
                    v-bind:key="product.id"
                    v-bind="product"/>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import ProductsBox from '@/components/ProductsBox'

export default {
    name : 'Search',
    components : {
        ProductsBox
    },
    data() {
        return {
            products: [],
            query: ''
        }
    },
    mounted() {
        document.title = 'Search | Ilios Shop'
        // Recupère query=xxxx
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)

        if(params.get("query")) {
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods : {
        async performSearch() {
            this.$store.commit('setIsLoading', true)
            
            await axios
                .post('/api/v1/products/search/', {'query': this.query})
                .then(response => {
                    this.products = response.data
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>