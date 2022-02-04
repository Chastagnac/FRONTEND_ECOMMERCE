<template>
  <div>
    <div id="wrapper">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/"
            ><img
              style="height: 150px"
              :src="require(`@/assets/logoblack.png`)"
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
            style="flex-grow: 1; justify-content: center"
          >
            <div class="navbar-item has-dropdown is-hoverable"></div>
            <router-link to="/shop" class="navbar-item">Boutique</router-link>
            <router-link to="/service" class="navbar-item">Service</router-link>
            <router-link to="/contact" class="navbar-item">Contact</router-link>
            <router-link to="/devis-clients" class="navbar-item"
              >Devis clients</router-link
            >
          </div>
          <div class="navbar-end">
            <router-link
              v-if="$store.state.isAuthenticated"
              to="my-account"
              class="navbar-item"
            >
              <i
                class="far fa-user"
                href="https://www.facebook.com/profile.php?id=100074600241159"
                data-mdb-ripple-color="dark"
              ></i>
            </router-link>
            <router-link v-else to="/log-in" class="navbar-item">
              <i
                class="far fa-user"
                href="https://www.facebook.com/profile.php?id=100074600241159"
                data-mdb-ripple-color="dark"
              ></i>
            </router-link>


            <router-link v-if="$store.state.isAuthenticated" v-on:click.native="logout()"  to="/" class="navbar-item">
              <i
                class="fas fa-sign-out-alt"
                v-on:click.native="logout()"
                href="https://www.facebook.com/profile.php?id=100074600241159"
                data-mdb-ripple-color="dark"
              ></i>
             </router-link>

            <router-link to="/cart" class="navbar-item">
              <i class="fas fa-shopping-cart"></i
            ></router-link>
          </div>
        </div>
      </nav>

      <section class="section">
        <router-view />
      </section>
    </div>

    <Footer></Footer>
  </div>
</template>

   <script>
import axios from "axios";
import Footer from "@/components/Footer";
export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
    };
  },
  components: {
    Footer,
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
    let recaptchaScript = document.createElement("script");
    let recaptchaScript2 = document.createElement("script");
    recaptchaScript.setAttribute("src", "//js-eu1.hs-scripts.com/25492966.js");
    recaptchaScript2.setAttribute(
      "src",
      "//cdn.cookie-script.com/s/b001f3b1be1e28435196e1181691cec7.js"
    );
    document.head.appendChild(recaptchaScript);
    document.head.appendChild(recaptchaScript2);
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
  methods: {
       logout() {
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
  
        this.$store.commit("removeToken");
        this.$router.push("/");
    },
  }
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
}

img {
  height: auto;
  max-width: 100%;
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

html,
body {
  margin: 0;
  display: table;
  height: 100%;
  width: 100%;
}
.container {
  height: auto;
}
.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.logofooter {
  margin-left: 30px;
}
.footer {
  width: 100%;
  position: relative;
  height: 30em;
  background-color: #272727;
  margin-top: 6%;
}
.footer .col {
  width: 190px;
  height: auto;
  float: left;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 0px 20px 20px 20px;
}
.footer .col h1 {
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 12px;
  line-height: 17px;
  padding: 20px 0px 5px 0px;
  color: rgba(255, 255, 255, 0.2);
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}
.footer .col ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.footer .col ul li {
  color: #999999;
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
  padding: 5px 0px 5px 0px;
  cursor: pointer;
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}
.social ul li {
  display: inline-block;
  padding-right: 5px !important;
}

.footer .col ul li:hover {
  color: #ffffff;
  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
}
.clearfix {
  clear: both;
}

.contenue {
  margin-left: 52%;
}

@media only screen and (min-width: 1280px) {
  .contain {
    width: 1200px;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1139px) {
  .contain .social {
    width: 1000px;
    display: block;
  }
  .social h1 {
    margin: 0px;
  }
}
@media only screen and (max-width: 950px) {
  .footer .col {
    width: 33%;
  }
  .footer .col h1 {
    font-size: 14px;
  }
  .footer .col ul li {
    font-size: 13px;
  }
}
@media only screen and (max-width: 500px) {
  .footer .col {
    width: 50%;
  }
  .footer .col h1 {
    font-size: 14px;
  }
  .footer .col ul li {
    font-size: 13px;
  }
}
@media only screen and (max-width: 340px) {
  .footer .col {
    width: 100%;
  }
}
</style>
