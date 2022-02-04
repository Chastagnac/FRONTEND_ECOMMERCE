<template>
  <div>
    <div class="box" style="margin: 30px; height: 370px">
      <router-link v-bind:to="product.get_absolute_url">
        <article class="media" style="background-color: black">
          <img
            :src="product.get_thumbnail"
            style="height: 200px; width: 100%"
          />
        </article>
        <div class="media-content" style="height: 90px">
          <div class="content">
            <p style="text-align: justify">
              {{ product.name }}
              <br />
            </p>
          </div>
        </div>

        <div class="container">
          <strong>{{ product.price }} €</strong><br />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { toast } from "bulma-toast";
export default {
  name: "ProductsBox",
  props: {
    product: Object,
  },
  methods: {
    addToCart() {
      // Construction de l'item
      const item = {
        product: this.product,
        quantity: 1,
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
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.column.is-narrow {
  width: 15%;
}
.box {
  transition: 0.3s;
  border-style: groove;
  border-color: #1d3d113b;
}
.box:hover {
  transform: scale(1.05);
  border-style: groove;
  border-color: #62ca3b3b;
}
.content {
  margin-top: 10px;
}
.container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>