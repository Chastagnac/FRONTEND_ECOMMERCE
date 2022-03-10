<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Récapitulatif</h1>
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
        <h2 class="subtitle">Informations</h2>

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
                <input type="email" class="input" v-model="email" readonly="readonly" />
              </div>
            </div>

            <div class="field">
              <label>Tel*</label>
              <div class="control">
                <input type="text" class="input" v-model="phone"  @keypress="isNumber($event)"  maxlength="10"/>
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
              <label>Code Postal*</label>
              <div class="control">
                <input type="text" class="input" v-model="zipcode"  @keypress="isNumber($event)"  maxlength="10"/>
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

        <hr />

        <div id="card-element" class="mb-5"></div>

        <template v-if="cartTotalLength">
          <hr />

          <button class="button is-dark" @click="submitForm">
            Payer avec Stripe
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emailjs from 'emailjs-com';
import { toast } from "bulma-toast";
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
      address: "",
      zipcode: "",
      place: "",
      errors: 0,
    };
  },
  mounted() {
    document.title = "Checkout | Djackets";
    this.cart = this.$store.state.cart;
    if (this.cartTotalLength > 0) {
      this.stripe = Stripe(
        "pk_test_51KZxsnKZ4kNJDQ8mtS34sp1hcsxDol8SDlmhyJMjESS5zEzWsswEV92csfXM2LPhC4TZMlpZR8tBTeVoBttC9b8U00CZm5h04I"
      );
      const elements = this.stripe.elements();
      this.card = elements.create("card", { hidePostalCode: true });
      this.card.mount("#card-element");
    }
    axios.defaults.headers.common["Authorization"] =  "Token " + localStorage.getItem("token");
     axios
      .get("/api/v1/users/me")
      .then((response) => {
        this.info = response.data;
        this.email = this.info.email;
      })
      .catch((error) => {
        console.log(error);
      });

  },
  methods: {

     isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },

    toast_affiche(parametre,type){
       toast({
        message: parametre,
        type: type,
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: "top-right",
        animate: { in: 'fadeIn', out: 'fadeOut' },
      });
    },

    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = 0;
      if (this.first_name === "") {
        this.errors = 1,
        this.toast_affiche("Il manque le prénom !","is-danger");
      }
      if (this.last_name === "") {
        this.errors = 1,
        this.toast_affiche("Il manque le nom !","is-danger");
      }
      if (this.email === "") {
        this.errors = 1,
        this.toast_affiche("Il manque l'email !","is-danger");
      }
      if (this.phone === "") {
        this.errors = 1,
        this.toast_affiche("Il manque le numéro de télephone!","is-danger");
      }
      if (this.address === "") {
        this.errors = 1,
        this.toast_affiche("Il manque l'adresse !","is-danger");
      }
      if (this.zipcode === "") {
        this.errors = 1,
        this.toast_affiche("Il manque le code postal !","is-danger");
      }
      if (this.place === "") {
        this.errors = 1,
        this.toast_affiche("Il manque la ville !","is-danger");
      }
      if (!this.errors) {
        this.toast_affiche("Chargement...",'is-info')
        this.$store.commit("setIsLoading", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.toast_affiche("Désolé. Un problème est survenu avec le moyen de paiement. Veuillez réessayer plus tard.",'is-danger');
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

      var templateParams = {
          from_name: this.first_name + " " + this.last_name,
          message: this.adress + ", " + this.zipcode + " " + this.place,
          reply_to: this.email, 
      };

      await axios
        .post("/api/v1/checkout/", data)
        .then((response) => {
          emailjs.send("service_6qlvzj7","template_6a7rtqd",templateParams,"user_p5FbC98Zv7d6YKahXNvTf")
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.toast_affiche("Désolé. Un problème est survenu avec le paiement. Veuillez réessayer plus tard.",'is-danger');
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
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