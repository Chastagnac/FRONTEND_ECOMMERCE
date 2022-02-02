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
              <label>Zip Code*</label>
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
            <button class="button is-dark" style="margin : 20px" @click="submitForm">
              Payer avec Stripe
            </button>
          </template>
          
        </div>
      </div><div class="notification is-danger mt-4" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
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
    document.title = "Se Digitaliser | Paiement";
    this.cart = this.$store.state.cart;
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];

      if (this.first_name === "") {
        this.errors.push("Le nom doit être rempli");
      }
      if (this.last_name === "") {
        this.errors.push("Le prénom doit être rempli");
      }
      if (this.email === "") {
        this.errors.push("L'email doit être rempli");
      }
      if (this.phone === "") {
        this.errors.push("Le numéro de téléphone doit être rempli");
      }
      if (this.adress === "") {
        this.errors.push("L'adresse doit être renseignée");
      }
      if (this.zipcode === "") {
        this.errors.push("Le zip code doit être renseigné");
      }
      if (this.place === "") {
        this.errors.push("La ville doit être renseignée");
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