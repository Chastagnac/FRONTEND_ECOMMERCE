<template>
  <div class="page-product m-6">
    <div class="columns is-multiline">
      <div class="column is-6">
        <figure class="image mb-6">
          <img :src="product.get_image" />
        </figure>
      </div>
      <div class="column is-6">
        <h1 class="title">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <br />
        <hr />
        <table class="table is-fullwidth" v-if="product.category === 2">
            <h2>Valeurs nutritionnelles (pour 100g) : </h2><br>
          <tr>
            <th>Valeurs énergétiques</th>
            <td>{{ product.energy_values }}</td>
          </tr>
          <tr>
            <th>Matières grasses</th>
            <td>{{ product.fatty_substances }}</td>
          </tr>
          <tr>
            <th>Fibre</th>
            <td>{{ product.carbs }}</td>
          </tr>
          <tr>
            <th>Protéines</th>
            <td>{{ product.proteins }}</td>
          </tr>
        </table>
        <br>
        <p><strong>Prix : </strong> ${{ product.price }}</p>
        <div class="field has-adddons mt-6">
          <div class="control">
            <input type="number" size="7" min="1" v-model="quantity" />
          </div>
          <div class="control mt-6">
            <a class="button is-dark" @click="addToCart">Ajouter au panier</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  // Récupère le produits une fois l'app montée
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit("setIsLoading", true);

      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      await axios
        .get(`/api/v1/products/${category_slug}/${product_slug}`)
        .then((response) => {
          this.product = response.data;

          document.title = this.product.name + " | Ilios Shop";
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    //  Mutation
    // Vérifie que la qt est bien >= à 1 et ajoute un item dans la liste
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      // Construction de l'item
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      // Commut == Mutation dans le store (afin d'actualiser le state)
      this.$store.commit("addToCart", item);

      toast({
        message: "Le produit à bien été ajouté au panier",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    },
  },
};
</script>

<style scoped>
.image {
  width: 50%;
}
</style>