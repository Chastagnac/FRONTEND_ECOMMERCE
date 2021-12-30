<template>
  <div id="wrapper">
    <nav class="navbar" role="navigation" aria-label="main navigation">
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
        <div class="navbar-start" style="flex-grow: 1; justify-content: center">
          <div class="navbar-item has-dropdown is-hoverable"></div>
          <router-link to="/shop" class="navbar-item">Boutique</router-link>

          <a class="navbar-item">Services</a>
          <a class="navbar-item">Commandes</a>
        </div>
        <div class="navbar-end">
          <li></li>
          <a
            class="far fa-user"
            href="https://www.facebook.com/profile.php?id=100074600241159"
            role="button"
            data-mdb-ripple-color="dark"
          ></a>
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
    </nav>

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

.navbar {
  min-height: 0rem;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  height: 150px;
  margin-top: -22px;
  border-color: #49ae25;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: auto;
  overflow: visible;
  vertical-align: -0.125em;
}

svg:not(:root).svg-inline--fa {
  overflow: visible;
  margin-right: 30px;
}

.navbar-start,
.navbar-end {
  align-items: stretch;
  display: flex;
  margin-right: 99px;
}

img {
  height: auto;
  max-width: 100%;
  margin-left: 45px;
}
a.navbar-item:focus,
a.navbar-item:focus-within,
a.navbar-item:hover,
a.navbar-item.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
.navbar-link:hover,
.navbar-link.is-active {
  background-color: #fafafa;
  color: #49ae25;
}

.hero.is-dark {
  background-image: url(/img/environnement-urbain.2d3a105e.png);
  color: #fff;
  height: 1171px;
}
.col-size {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  background-color: rgba(182, 182, 182, 0.3);
  margin: auto;
  margin-top: auto;
  margin-left: auto;
  max-width: 61%;
  height: 22em;
  margin-top: 258px;
  margin-left: 400px;
}
.hero.is-dark .title {
  color: #151515;
  margin-top: 47px;
  padding-top: 189px;
  font-family: inherit;
}

.tabs:not(:last-child),
.pagination:not(:last-child),
.message:not(:last-child),
.level:not(:last-child),
.breadcrumb:not(:last-child),
.block:not(:last-child),
.title:not(:last-child),
.subtitle:not(:last-child),
.table-container:not(:last-child),
.table:not(:last-child),
.progress:not(:last-child),
.notification:not(:last-child),
.content:not(:last-child),
.box:not(:last-child) {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 3rem !important;
}
</style>
