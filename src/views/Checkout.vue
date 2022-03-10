<template>
  <div class="page-checkout">
    <div class="columns is-multiline" style="width: 85%; margin: auto">
      <div class="column is-12">
        <h1 class="title">Récapitulatif</h1>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>${{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="column is-12 box">
        <h2 class="subtitle">Détails des achats</h2>
        <p class="has-text-grey mb-4">* Tous les champs sont requis</p>

        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label>Prénom*</label>
              <div class="control">
                <input type="text" class="input" v-model="first_name" />
              </div>
            </div>
            <div class="field">
              <label>Nom*</label>
              <div class="control">
                <input type="text" class="input" v-model="last_name" />
              </div>
            </div>
            <div class="field">
              <label>E-mail*</label>
              <div class="control">
                <input type="email" class="input" v-model="email" />
              </div>
            </div>
            <div class="field">
              <label>Téléphone*</label>
              <div class="control">
                <input type="text" class="input" v-model="phone" />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label>Addresse*</label>
              <div class="control">
                <input type="text" class="input" v-model="adress" />
              </div>
            </div>
            <div class="field">
              <label>Code Postal*</label>
              <div class="control">
                <input type="text" class="input" v-model="zipcode" />
              </div>
            </div>
            <div class="field">
              <label>Place*</label>
              <div class="control">
                <input type="text" class="input" v-model="place" />
              </div>
            </div>
          </div>
          <hr />
          <div id="card-element" class="mb-5"></div>
          <template v-if="cartTotalLenght">
            <hr />
            <div>
              <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="(v) => (loading = v)"/>

              <button
                class="button is-dark"
                style="margin: 20px"
                @click="submitForm"
              >
                Payer avec Stripe
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      adress: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Checkout | Djackets";
    this.cart = this.$store.state.cart;
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];
      if (this.first_name === "") {
        this.errors.push("The first name field is missing!");
      }
      if (this.last_name === "") {
        this.errors.push("The last name field is missing!");
      }
      if (this.email === "") {
        this.errors.push("The email field is missing!");
      }
      if (this.phone === "") {
        this.errors = 1;
        this.toast_affiche(
          "Le numéro de téléphone doit être rempli",
          "is-danger"
        );
      }
      if (this.address === "") {
        this.errors.push("The address field is missing!");
      }
      if (this.zipcode === "") {
        this.errors.push("The zip code field is missing!");
      }
      if (this.place === "") {
        this.errors.push("The place field is missing!");
      }
      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.errors.push(
              "Something went wrong with Stripe. Please try again"
            );
            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = [];
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        };
        items.push(obj);
      }
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        place: this.place,
        phone: this.phone,
        items: items,
        stripe_token: token.id,
      };
      await axios
        .post("/api/v1/checkout/", data)
        .then((response) => {
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.errors.push("Something went wrong. Please try again");
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
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