<template>
  <div>
    <div class="container">
      <div class="columns">
        <SideShop></SideShop>
        <div class="column is-9">
          <div class="columns">
            <div class="column is-four-fifths">
              <h1 class="title">Nos produits</h1>
            </div>
            <div class="column">
              <p class="hover-text">
                {{ products.length }} <i class="fas fa-tags"></i>
              </p>
            </div>
          </div>

          <section class="gridcontainer">
            <ProductsBox
              v-for="product in products"
              v-bind:key="product.id"
              v-bind:product="product"
            />
          </section>
        </div>
      </div>
    </div>
    <div class="columns is-multiline"></div>
  </div>
</template>


<script>
import axios from "axios";
// @ = racourcie pour les components
import ProductsBox from "@/components/ProductsBox";
import SideShop from "@/components/SideShop";
export default {
  name: "Shop",
  data() {
    return {
      products: [],
      price: 4000,
    };
  },
  components: {
    ProductsBox,
    SideShop
  },

  mounted() {
    this.getLastedProducts();
    document.title = "Se-digitaliser";
  },
  methods: {
    getLastedProducts() {
      axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCategory() {
      this.products = [];
      const categorySlug = this.$route.params.category_slug;
      axios
        .get(`/api/v1/products/${categorySlug}/`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.gridcontainer {
  display: grid;
  text-align-last: center;
  margin: 20px;
  grid-template-columns: 33% 33% 33%;
}
@media only screen and (max-width: 592px) {
.gridcontainer {
  display: flex;
  -moz-text-align-last: center;
  text-align-last: center;
  margin: 20px;
  grid-template-columns: 33% 33% 33%;
  flex-direction: column;
}
}
</style>
