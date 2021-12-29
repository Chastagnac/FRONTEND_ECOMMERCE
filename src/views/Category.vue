<template>
  <div>
    <div class="container">
      <div class="columns">
        <SideShop></SideShop>
        <div class="column is-9">
          <div class="columns">
            <div class="column is-four-fifths">
              <h1 class="title">Catégorie {{ getCategorySlug }}</h1>
            </div>
            <div class="column">
              <p class="hover-text">{{ category.products.length }} <i class="fas fa-tags"></i></p>
              
            </div>
          </div>

          <section class="gridcontainer">
            <ProductsBox
              v-for="product in category.products"
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
import { toast } from "bulma-toast";
// @ = racourcie pour les components
import SideShop from "@/components/SideShop";
import ProductsBox from "@/components/ProductsBox";

export default {
  name: "Category",
  data() {
    return {
      category: {
        products: [],
      },
      categorySlug: "",
    };
  },
  components: {
    ProductsBox,
    SideShop,
  },
  watch: {
    $route(to, from) {
      if (to.name === "Category") {
        this.getCategory();
      }
    },
  },
  computed: {
    getCategorySlug() {
      return this.$route.params.category_slug;
    },
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;

      this.$store.commit("setIsLoading", true);

      axios
        .get(`/api/v1/products/${categorySlug}/`)
        .then((response) => {
          this.category = response.data;

          document.title = this.category.name + " | Ilios Shop";
        })
        .catch((error) => {
          console.log(error);

          toast({
            message: `Quelque chose ne s'est pas passé correctement, essayez à nouveau`,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style>
.columns.is-multiline {
  justify-content: center;
}
.hover-text {
  background-color: #c2c2c2;
  border-radius: 5px;
  margin: 15px;
  color: green;
  width: 70px;
  text-align: center;
}
</style>  