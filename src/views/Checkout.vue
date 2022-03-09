<template>
  <div class="page-checkout">
    <div class="columns is-multiline" style="width: 85%; margin: auto">
      <div class="column is-12">
        <h1 class="title">Paiement</h1>
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
              <label>Ville*</label>
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
import { toast } from "bulma-toast";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  name: "Checkout",
  data() {
    this.publishableKey =
      "pk_test_51KZxsnKZ4kNJDQ8mtS34sp1hcsxDol8SDlmhyJMjESS5zEzWsswEV92csfXM2LPhC4TZMlpZR8tBTeVoBttC9b8U00CZm5h04I";
    return {
      cart: {
        items: [],
      },

      loading: false,
      lineItems: [
        {
          price: ["price_1KadjPKZ4kNJDQ8mMbZTE5fg","price_1KahIDKZ4kNJDQ8mUxxt5eum","price_1KahEyKZ4kNJDQ8mCn3nf9ok"], // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      
      successURL: "http://localhost:8080/contact",
      cancelURL: "http://localhost:8080/tutoriel",

      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      adress: "",
      zipcode: "",
      place: "",
      errors: 0,
    };
  },
  mounted() {
    document.title = "Eco-Service | Paiement";
    this.cart = this.$store.state.cart;
  },

  components:{
      StripeCheckout,
  },

  methods: {
    toast_affiche(parametre, type) {
      toast({
        message: parametre,
        type: type,
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: "top-right",
        animate: { in: "fadeIn", out: "fadeOut" },
      });
    },

    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = 0;

      if (this.first_name === "") {
        this.errors = 1;
        this.toast_affiche("Le nom doit être rempli", "is-danger");
      }
      if (this.last_name === "") {
        this.errors = 1;
        this.toast_affiche("Le prénom doit être rempli", "is-danger");
      }
      if (this.email === "") {
        this.errors = 1;
        this.toast_affiche("L'email doit être rempli", "is-danger");
      }
      if (this.phone === "") {
        this.errors = 1;
        this.toast_affiche(
          "Le numéro de téléphone doit être rempli",
          "is-danger"
        );
      }
      if (this.adress === "") {
        this.errors = 1;
        this.toast_affiche("L'adresse doit être renseignée", "is-danger");
      }
      if (this.zipcode === "") {
        this.errors = 1;
        this.toast_affiche("Le zip code doit être renseigné", "is-danger");
      }
      if (this.place === "") {
        this.errors = 1;
        this.toast_affiche("La ville doit être renseignée", "is-danger");
      }
      if (!this.errors) {
        this.toast_affiche("Chargement...", "is-info");
        // You will be redirected to Stripe's secure checkout page
        this.$refs.checkoutRef.redirectToCheckout();
      }
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