<template>
  <div id="wrapper">
<nav
  class="navbar"
  role="navigation"
  aria-label="main navigation"
>
  <div class="navbar-brand">
       <router-link to="/"
          ><img style="height: 150px" :src="require(`@/assets/logoblack.png`)"
        /></router-link>

    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div class="navbar-menu">
    <div
      class="navbar-start"
      style="flex-grow: 1; justify-content: center;"
    >
    <div class="navbar-item has-dropdown is-hoverable">
          <a
            class="navbar-link"
            href="https://bulma.io/documentation/overview/start/"
          >
            Boutiques
          </a>
          <div class="navbar-dropdown is-boxed">
            <a
              class="navbar-item"
              href="https://bulma.io/documentation/overview/start/"
            >
              Alimentaires
            </a>
            <a
              class="navbar-item"
              href="https://bulma.io/documentation/overview/modifiers/"
            >
              Maison
            </a>
            <a
              class="navbar-item"
              href="https://bulma.io/documentation/columns/basics/"
            >
              Jouets
            </a>
            <a
              class="navbar-item"
              href="https://bulma.io/documentation/layout/container/"
            >
              Electronique
            </a>
            <a
              class="navbar-item"
              href="https://bulma.io/documentation/form/general/"
            >
              Textiles
            </a>
          </div>
    </div>
      <a class="navbar-item">link 1</a>
      <a class="navbar-item">link 2</a>
    </div>
    <div class="navbar-end">
      <a class="navbar-item">shopping cart</a>
    </div>
  </div>
</nav>


    <div
      class="is-loading-bar has-text-centered"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
    };
  },
  // On initialize le localstorage avant les injections
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  // Quand l'app est "montée" on recupère $cart du store dans this.cart
  mounted() {
    this.cart = this.$store.state.cart;
  },
  // Lorsque l'app tourne, si un produit viens s'add au panier,
  //  il incrémente et retoure le total
  computed: {
    cartTotalLenght() {
      let totalLenght = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLenght += this.cart.items[i].quantity;
      }
      return totalLenght;
    },
  },
};
</script>



<style lang="scss">
@import "../node_modules/bulma";

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>
