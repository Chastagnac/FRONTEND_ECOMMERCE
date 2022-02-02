<template>
  <div>
    <router-link v-bind:to="product.get_absolute_url">
      <div class="box" style="margin: 30px; height: 370px">
        <article class="media" style="background-color: black">
          <img :src="product.get_thumbnail" />
        </article>
        <div class="media-content">
          <div class="content">
            <p>
              {{ product.name }}
              <br />
            </p>
          </div>
        </div>

        <div class="container">
          <strong>{{ product.price }} €</strong><br />
        </div>
        <button @click="addToCart()">
          <i
            class="fas fa-shopping-cart fa-1x"
            style="color: green !important"
          ></i>
        </button>
      </div>
    </router-link>
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
  border-style: groove;
  border-color: #1d3d113b;
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
.add {
  margin-left: 14%;
  position: absolute;
  display: flex;
  padding: 0px 2px 0px 28px;
  font-variant: JIS04;
  border-radius: 51px;
  display: flex;
}
</style>