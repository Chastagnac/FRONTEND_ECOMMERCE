<template>
  <div id="wrapper">
    <nav class="navbar" role="navigation" aria-label="dropdown navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/"
            ><img
              style="height: 130px"
              :src="require(`@/assets/logoblack.png`)"
          /></router-link>
        </div>
        <div class="auto">
          <div class="column">
            <router-link to="/Boutique" class="navbar-item"
              >Boutique</router-link
            >
          </div>
          <div class="column">
            <router-link to="/Services" class="navbar-item"
              >Services</router-link
            >
          </div>
          <div class="column">
            <router-link to="/Contact" class="navbar-item"
              >Contactez-nous</router-link
            >
          </div>
        </div>
        <div class="navbar-end">
          <router-link to="/MyAccount" v-if="$store.state.isAuthenticated"
            ><i class="fa fa-address-book fa-2x" aria-hidden="true"></i
          ></router-link>
          <router-link to="/log-in" v-else>
            <i class="fa fa-address-book fa-2x" aria-hidden="true"></i
          ></router-link>
          <router-link to="/cart" v-if="$store.state.isAuthenticated"
            ><i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
            <span>({{ cartTotalLenght }})</span>
          </router-link>
        </div>
      </div>
    </nav>
    <!-- <nav class="navbar">
      <div class="columns is-full">
        <div class="column is-three-fifths">
          <router-link to="/"
            ><img
              style="height: 130px"
              :src="require(`@/assets/logoblack.png`)"
          /></router-link>
        </div>
        <div class="column is-three-fifths">
          <div class="column">
            <router-link to="/Boutique" class="navbar-item"
              >Boutique</router-link
            >
          </div>
          <div class="column">
            <router-link to="/Services" class="navbar-item"
              >Services</router-link
            >
          </div>
          <div class="column">
            <router-link to="/Contact" class="navbar-item"
              >Contactez-nous</router-link
            >
          </div>
        </div>

        <div class="column is-three-fifths">
          <router-link to="/MyAccount" v-if="$store.state.isAuthenticated"
            ><i class="fa fa-address-book" aria-hidden="true"></i
          ></router-link>
          <router-link to="/log-in" v-else>
            <i class="fa fa-address-book" aria-hidden="true"></i
          ></router-link>
          <router-link to="/cart" v-if="$store.state.isAuthenticated"
            ><i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span>({{ cartTotalLenght }})</span>
          </router-link>
        </div>
      </div>
    </nav> -->
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
