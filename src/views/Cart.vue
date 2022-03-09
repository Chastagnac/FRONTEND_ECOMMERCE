<template>
  <div class="page-cart" style="margin: 20px">
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
              v-on:removeFromCart="removeFromCart"
            />
          </tbody>
        </table>

        <p v-else>
          Aucun article dans le panier ..
          <a href="/" class="is-italic">Voir les nouveautés ?</a>
        </p>
        <br />
        <div class="column is-12 box">
          <h2 class="subtitle">Summary</h2>
          <strong>$ {{ cartTotalPrice.toFixed(2) }}</strong
          >, {{ cartTotalLenght }} items

          <hr />

          <router-link to="/Checkout" class="button is-dark"
            >Procéder au paiement</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CartItem from "@/components/CartItem";

export default {
  name: "Cart",
  data() {
    return {
      cart: {
        items: [],
      },
    };
    items_stripe = [
      "price_1KahBgKZ4kNJDQ8m6FE8TUXP",
      "price_1KahDVKZ4kNJDQ8mmL7vutsL",
      "price_1KahEyKZ4kNJDQ8mCn3nf9ok",
      "price_1KahGoKZ4kNJDQ8mRSdMd2K0",
      "price_1KahIDKZ4kNJDQ8mUxxt5eum",
      "price_1KahJuKZ4kNJDQ8mAQdR5uW0",
      "price_1KahLAKZ4kNJDQ8mOmD0L9C4",
    ];
  },
  components: {
    CartItem,
  },
  // Quand l'app est "montée" on recupère $cart du store dans this.cart
  mounted() {
    this.cart = this.$store.state.cart;
    console.log(this.cart.items)
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  computed: {
    cartTotalLenght() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
  },
};
</script>