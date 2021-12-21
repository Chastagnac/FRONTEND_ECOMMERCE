<template>
    <div class="home">
        <section class="hero is-medium is-dark mb-6">
            <div class="hero-body has-text-centered">
                <div class="col-size">
                    
                    <p class="title mb-4">Eco Services</p>
                    <p class="subtitle"></p>
                    <button class="button is-success" name="valider">Découvrez nos services</button>
                </div>      

            </div>
        </section>
        <div class="columns is-multiline">
            <div clas="column is-12">
                <h2 class="is-size-2 has-text-centered">Derniers produits</h2>
            </div>
        </div>
        <div class="columns is-multiline">
            <ProductsBox
                v-for="product in lastestProducts"
                v-bind:key="product.id"
                v-bind:product="product" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
// @ = racourcie pour les components
import ProductsBox from '@/components/ProductsBox'

export default {
    name: "Home",
    data() {
        return {
            lastestProducts: [],
        };  
    },
    components: {
        ProductsBox
    },
    mounted() {
        this.getLastedProducts();
        document.title = 'Se-digitaliser'
    },
    methods: {
        getLastedProducts() {
            axios
            .get("/api/v1/latest-products/")
            .then((response) => {
                this.lastestProducts = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
};
</script>

<style>
.hero-body.has-text-centered {
    background-color: aqua;
    background-image: url("../assets/environnement-urbain.png");
}
</style>
