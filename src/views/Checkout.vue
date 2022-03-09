<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box" style="margin: auto; width: 70%">
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
              <td>${{ item.product.price }}</td>
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

      <div
        class="column is-12 box"
        style="margin: auto; width: 70%; margin-top: 30px"
      >
        <h2 class="subtitle">Details</h2>

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
              <label>Tel*</label>
              <div class="control">
                <input type="text" class="input" v-model="phone" />
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label>Adresse*</label>
              <div class="control">
                <input type="text" class="input" v-model="address" />
              </div>
            </div>

            <div class="field">

              <label>Zip code*</label>
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
        </div>

        <div class="notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>

        <hr />

        <div id="card-element" class="mb-5"></div>

        <template v-if="cartTotalLength">
          <hr />

          <button class="button is-dark" @click="submitForm">
            Pay with Stripe
          </button>
        </template>
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
      address: "",
      zipcode: "",
      place: "",
      errors: 0,
    };
  },
  mounted() {
    document.title = "Eco-Service | Paiement";
    this.cart = this.$store.state.cart;
    if (this.cartTotalLength > 0) {
      this.stripe = Stripe(
        "pk_test_51KZxsnKZ4kNJDQ8mtS34sp1hcsxDol8SDlmhyJMjESS5zEzWsswEV92csfXM2LPhC4TZMlpZR8tBTeVoBttC9b8U00CZm5h04I"
      );
      const elements = this.stripe.elements();
      this.card = elements.create("card", { hidePostalCode: true });
      this.card.mount("#card-element");
    }
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
        this.toast_affiche("Le numéro de téléphone doit être rempli","is-danger");
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
        //   this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.errors.push("Something went wrong. Please try again");
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
      }
    },
   
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>