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
                <input
                  type="email"
                  class="input"
                  v-model="email"
                  readonly="readonly"
                />
              </div>
            </div>

            <div class="field">
              <label>Tel*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="phone"
                  @keypress="isNumber($event)"
                  maxlength="10"
                />
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
                <input
                  type="text"
                  class="input"
                  v-model="zipcode"
                  @keypress="isNumber($event)"
                  maxlength="10"
                />
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
        <button class="button is-dark" @click="SModal()">
          Payer avec Stripe
        </button>
        <hr />

        <template v-if="cartTotalLength">
          <hr />
        </template>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <svg
            id="wave"
            style="
              margin: -40px;
              position: absolute;
              transform: rotate(180deg);
              transition: 0.3s;
            "
            viewBox="0 0 1440 490"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop
                  stop-color="rgba(104.395, 117.177, 250.802, 1)"
                  offset="0%"
                ></stop>
                <stop
                  stop-color="rgba(144.275, 152.78, 241.695, 0.38)"
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <path
              style="transform: translate(0, 0px); opacity: 1"
              fill="url(#sw-gradient-0)"
              d="M0,196L120,163.3C240,131,480,65,720,98C960,131,1200,261,1440,310.3C1680,359,1920,327,2160,294C2400,261,2640,229,2880,179.7C3120,131,3360,65,3600,57.2C3840,49,4080,98,4320,171.5C4560,245,4800,343,5040,375.7C5280,408,5520,376,5760,359.3C6000,343,6240,343,6480,310.3C6720,278,6960,212,7200,212.3C7440,212,7680,278,7920,277.7C8160,278,8400,212,8640,163.3C8880,114,9120,82,9360,122.5C9600,163,9840,278,10080,343C10320,408,10560,425,10800,400.2C11040,376,11280,310,11520,236.8C11760,163,12000,82,12240,49C12480,16,12720,33,12960,57.2C13200,82,13440,114,13680,114.3C13920,114,14160,82,14400,73.5C14640,65,14880,82,15120,89.8C15360,98,15600,98,15840,81.7C16080,65,16320,33,16560,24.5C16800,16,17040,33,17160,40.8L17280,49L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
            ></path>
          </svg>
          <img src="../../src/assets/stripe.png" class="stripelogo" alt="dzd" />
          
          <div id="card-element" class="mb-5 stripecard"></div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="submitForm">Payer</button>
          <button class="button" @click="closeModal">Retour</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emailjs from "emailjs-com";
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
      showModal: false,
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
    axios.defaults.headers.common["Authorization"] =
      "Token " + localStorage.getItem("token");
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
    SModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

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
        (this.errors = 1),
          this.toast_affiche("Il manque le prénom !", "is-danger");
      }
      if (this.last_name === "") {
        (this.errors = 1),
          this.toast_affiche("Il manque le nom !", "is-danger");
      }
      if (this.email === "") {
        (this.errors = 1),
          this.toast_affiche("Il manque l'email !", "is-danger");
      }
      if (this.phone === "") {
        (this.errors = 1),
          this.toast_affiche("Il manque le numéro de télephone!", "is-danger");
      }
      if (this.address === "") {
        (this.errors = 1),
          this.toast_affiche("Il manque l'adresse !", "is-danger");
      }
      if (this.zipcode === "") {
        (this.errors = 1),
          this.toast_affiche("Il manque le code postal !", "is-danger");
      }
      if (this.place === "") {
        (this.errors = 1),
          this.toast_affiche("Il manque la ville !", "is-danger");
      }
      if (!this.errors) {
        this.toast_affiche("Chargement...", "is-info");
        this.$store.commit("setIsLoading", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.toast_affiche(
              "Désolé. Un problème est survenu avec le moyen de paiement. Veuillez réessayer plus tard.",
              "is-danger"
            );
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
          emailjs.send(
            "service_6qlvzj7",
            "template_6a7rtqd",
            templateParams,
            "user_p5FbC98Zv7d6YKahXNvTf"
          );
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.toast_affiche(
            "Désolé. Un problème est survenu avec le paiement. Veuillez réessayer plus tard.",
            "is-danger"
          );
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


<style scoped>
.stripelogo {
  height: 8em;
  display: flex;
  margin-top: 8em;
}
.stripecard {
    background-color: aqua;
}

.stripecard[data-v-e9bc6700] {
    background-color: #c7ccf96b;
    height: 46px;
    padding: 57px 50px;
    margin: auto;
    width: 72%;
    border-radius: 32px 0;
}
</style>