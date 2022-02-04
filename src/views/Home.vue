<template>
  <div>
    <section class="section is-large">
      <br />
      <br />
      <div class="boxe" id="bluraccueil">
        <h1 class="title">
          <strong> La démarche zéro déchet, zéro gaspillage </strong
          ><br /><br />
        </h1>
        <h2 class="subtitle">
          Le “zéro déchet, zéro gaspillage” est une démarche pour réduire notre
          impact sur l’environnement, en diminuant la quantité de déchets que
          nous produisons et leurs impacts négatifs sur la planète.<br />Le zéro
          déchet est une démarche progressive et positive, qu’on peut suivre à
          titre individuel et collectif. 
        </h2>
  
        <div class="boxeInto">
          <router-link to="/service">
            <button class="button2">Découvrez nos services</button></router-link
          >
        </div>
      </div>
    </section>
    <section class="section is-medium">
      <div class="cont">
        <div class="columns">
          <div class="column">
            <h1 class="title">Présentation</h1>
            <p>
              Les déchets sont partout et leur quantité a doublé en 40 ans.
              D’ailleurs, 97% des français considèrent que la société dans son
              ensemble produit trop de déchets. Bonne nouvelle ! De simples
              gestes existent pour réduire ses déchets et éviter le gaspillage
              comme acheter moins emballé et en vrac, composter, acheter
              uniquement ce dont on a besoin.<br />
              <br />580 Kg : de déchets jetés par an par personne en France
              <br /><br />326 Millions de tonnes : de déchets produits par an en
              France (dont 32 millions de tonnes pour les ménages)
              <br /><br />1175000 Tonnes d'emballages plastique mis sur le
              marché par an en France.<br /><br />
              <br /><br />
            </p>
          </div>
          <div class="column" id="droite"></div>
        </div>
      </div>
    </section>

    <div class="section" id="sect">
      <h1 class="title">Découvrez nos derniers produits !</h1>
      <h2 class="subtitle">
        Retrouvez les produits <strong>tendance</strong>, du moment
      </h2>
      <div class="containeuri">
        <div class="columns is-multiline">
          <div
            v-for="product in lastestProducts"
            :key="product.value"
            class="column is-one-third"
          >
            <div class="card">
              <div class="card-image">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image mb-6 is-128x128">
                        <img :src="product.get_image" />
                      </figure>
                    </div>
                    <div class="media-content">
                      <router-link
                        v-bind:to="product.get_absolute_url"
                        class="button is-dark mt-4"
                        >Voir détails</router-link
                      >
                    </div>
                  </div>
                  <p>{{ product.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      lastestProducts: [],
    };
  },
  mounted() {
    this.getLastedProducts();
    document.title = "Se-digitaliser";
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "//js-eu1.hs-scripts.com/25492966.js");
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    getLastedProducts() {
      axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          for (let i = 0; i < 3; i++) {
            this.lastestProducts.push(response.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.section.is-large {
  background: #d0ebdc;
  background-image: url("../assets/environnement-urbain.jpg");
  height: 45em;
  padding: 0;

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
}
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
#bluraccueil{
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
  }
}
.title {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
  padding-top: 7%;
  text-align: center;
}
.subtitle {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 3.25;
  text-align: center;
}
.section {
  padding: 0;
}
.section.is-medium {
  padding: 9rem 4.5rem;
  background: #fff;
  height: 46em;
}

.cont {
  background: #fff;
}

#droite {
  background: #d0ebdc;
}
.button2 {
  margin-top: 33px;
  background-color: #418014;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  color: whitesmoke;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
}
.containeuri {
  width: 80%;
  margin: auto;
  background-color: #f5f5f6;
}
#sect {
  margin-top: 100px;
  background: #f5f5f6;
}

.boxe {
  background-color: rgba(182, 182, 182, 0.6);
  height: 27em;
  width: 48%;
  margin: 7px auto;
  border-radius: 3%;
}

.boxeInto {
  display: grid;
  width: 50%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
p {
  width: 90%;
  text-align: justify;
}
.card-image {
  height: 300px;
}

.input {
  width: 300px !important;
}
@media only screen and (max-width: 1280px) {
  .boxe {
    width: 100%;
    height: 35em;
  }
}
@media only screen and (max-width: 600px) {
  .boxe {
    width: 100%;
    height: 45em;
  }
  .title p {
    width: 96%;
  }
}
@media screen and (min-width: 1015px) and (max-width: 1420px) {
  #sect {
    background: #f5f5f6;
    margin-top: 23%;
  }
}
@media screen and (min-width: 900px) and (max-width: 1015px) {
  #sect {
    background: #f5f5f6;
    margin-top: 33%;
  }
}
@media screen and (min-width: 800px) and (max-width: 917px) {
  #sect {
    background: #f5f5f6;
    margin-top: 53%;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  #sect {
    background: #f5f5f6;
    margin-top: 53%;
  }
}
@media screen and (min-width: 480px) and (max-width: 600px) {
  #sect {
    background: #f5f5f6;
    margin-top: 83%;
  }
  .section.is-medium {
    padding: 9rem 4.5rem;
    background: #fff;
    height: 46em;
    margin-top: 31%;
  }
}
</style>
