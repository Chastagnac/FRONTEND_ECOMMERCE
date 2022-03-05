<template>
  <div>
    <section class="section is-large">
      <div class="boxe" id="bluraccueil">
        <div class="home">
          <Carousel
            :navigation="true"
            :pagination="true"
            :startAutoPlay="true"
            :timeout="5000"
            class="carousel"
            v-slot="{ currentSlide }"
          >
            <Slide v-for="(slide, index) in carouselSlides" :key="index">
              <div v-show="currentSlide === index + 1" class="slide-info">
                <img
                  id="imgcarou"
                  :src="require(`../assets/${slide}.png`)"
                  alt=""
                />
                <div id ="titleservices" v-if="index === 0">
                  <router-link to="/service" class ="titlecarousel">
                  <div>
                     Services
                  </div>
                 
                  </router-link>
                </div>
                <div id ="titleboutique" v-else>
                  <router-link to="/shop" class ="titlecarousel">Boutique</router-link>
                </div>
                
              </div>
            </Slide>
          </Carousel>
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
          <div class="column">
            <img
              src="../assets/zero-dechet-tendance-qui-emballe-F.jpeg"
              class="responsive"
            />
          </div>
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
            <div class="card box2">
              <router-link v-bind:to="product.get_absolute_url">
                <div class="card-image">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image mb-6 is-128x128">
                          <img :src="product.get_image" />
                        </figure>
                      </div>
                      <div class="media-content"></div>
                    </div>
                    <p>{{ product.name }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Slide from "../components/Slide.vue";

import axios from "axios";
export default {
  name: "Home",
  components: { Carousel, Slide },
  setup() {
    const carouselSlides = ["logo_services","boutique"];
    return { carouselSlides };
  },

  data() {
    return {
      lastestProducts: [],
    };
  },
  mounted() {
    this.getLastedProducts();
    document.title = "Se-digitaliser";
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
.mycarousel {
  width: 50%;
  margin: auto;
}
.titlecarousel{
  color:#464646;
  transition: 0.3s;
}
.carousel {
  position: relative;
  max-height: 100vh;
  height: 44vh;
}
.slide-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  height: 100%;
}
#titleboutique{
position: absolute;
right: 43%;
font-size: 30px;
}
#titleservices{
  position: absolute;
right: 44%;
font-size: 30px;
}

#imgcarou {
 height: 46%;
-o-object-fit: cover;
object-fit: cover;
align-content: center;
display: flex;
justify-content: center;
margin: auto;
margin-top: 8%;}

body {
  font-family: sans-serif;
}
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
  #bluraccueil {
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(4px);
  }
}
.responsive {
  float: right;
  max-height: 100%;
  height: auto;
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
.box2 {
  transition: 0.3s;
  border-style: groove;
  border-color: #1d3d113b;
}
.box2:hover {
  transform: scale(1.05);
  border-style: groove;
  border-color: #62ca3b3b;
}
.cont {
  background: #fff;
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
  background-color: rgba(229,230,228,0.6);
  width: 48%;
  border-radius: 3%;
  margin: auto;
  top: 16%;
  position: relative;
  height: auto;
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
  
}
@media only screen and (max-width: 600px) {
  .boxe {
    width: 100%;
  }
  .title p {
    width: 96%;
  }
}
@media only screen and (max-width: 500px) {
  #sect {
    background: #f5f5f6;
    margin-top: 145%;
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
