<template>
  <div>

    <section class="section is-large">
      <br />
      <br />
      <div class="boxe" id="bluraccueil">
<section class="carousel" aria-label="Gallery">
  <ol class="carousel__viewport">
    <li id="carousel__slide1"
        tabindex="0"
        class="carousel__slide">
        <div id="aligncolumn">
          
         <router-link to="/service" ><img id ="logowhiteaccueil" :src="require(`@/assets/logo_services.png`)" /></router-link>

          <router-link to="/service" ><h1 id="titlecaroussel">Services</h1></router-link>
        </div>
         
      <div class="carousel__snapper">
        
        <a href="#carousel__slide2"
           class="carousel__prev">Go to last slide</a>
         
        <a href="#carousel__slide2"
           class="carousel__next">Go to next slide</a>
             
      </div>
    </li>
    <li id="carousel__slide2"
        tabindex="0"
        class="carousel__slide">
        <div id="aligncolumn">
          
          <router-link to="/shop"> <img id ="logowhiteaccueil" :src="require(`@/assets/boutique.png`)" /></router-link>

         <router-link to="/shop"> <h1 id="titlecaroussel">Boutique</h1></router-link>
        </div>
      <div class="carousel__snapper"></div>
      <a href="#carousel__slide1"
         class="carousel__prev">Go to previous slide</a>
      <a href="#carousel__slide1"
         class="carousel__next">Go to next slide</a>
    </li>
    
  </ol>
  <aside class="carousel__navigation">
    <ol class="carousel__navigation-list">
      <li class="carousel__navigation-item" >
        <a href="#carousel__slide1" id="slideun"
           class="carousel__navigation-button">Go to slide 1</a>
      </li>
      <li class="carousel__navigation-item">
        <a href="#carousel__slide2"
           class="carousel__navigation-button">Go to slide 2</a>
      </li>
      
    </ol>
  </aside>
</section>
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

@keyframes tonext {
  75% {
    left: 0;
  }
  95% {
    left: 100%;
  }
  98% {
    left: 100%;
  }
  99% {
    left: 0;
  }
}

@keyframes tostart {
  75% {
    left: 0;
  }
  95% {
    left: -300%;
  }
  98% {
    left: -300%;
  }
  99% {
    left: 0;
  }
}

@keyframes snap {
  96% {
    scroll-snap-align: center;
  }
  97% {
    scroll-snap-align: none;
  }
  99% {
    scroll-snap-align: none;
  }
  100% {
    scroll-snap-align: center;
  }
}



* {
  box-sizing: border-box;
  scrollbar-color: transparent transparent; /* thumb and track color */
  scrollbar-width: 0px;
}

*::-webkit-scrollbar {
  width: 0;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: transparent;
  border: none;
}

* {
  -ms-overflow-style: none;
}

ol, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.carousel {
  position: relative;
  padding-top: 0%;
  filter: drop-shadow(0 0 10px #0003);
  perspective: 100px;
  width: 100%;
  height: 100%;
}
#aligncolumn {
  display: flex;
  flex-direction: column;
  top: 30%;
  position: relative;
}
#logowhiteaccueil{
  height: 169px;
margin: auto;
display: flex;
}
#titlecaroussel{
  position: relative;
  text-align: center;
  top:50%;
  color: #363636;
  font-size: 32px;
}
#slideun{
  background-color:white;
}
.carousel__viewport {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow-x: scroll;
  counter-reset: item;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  border-radius: 17px;
}

.carousel__slide {
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  counter-increment: item;
}

.carousel__slide:nth-child(even) {
background-color: rgba(255, 255, 255, 0.6);
}

.carousel__slide:before {
  content: counter(item);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-40%,70px);
  color: #fff;
  font-size: 2em;
  display: none;
}

.carousel__snapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0%;
    scroll-snap-align: center;
}

@media (hover: hover) {
  .carousel__snapper {
    animation-name: tonext, snap;
    animation-timing-function: ease;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  .carousel__slide:last-child .carousel__snapper {
    animation-name: tostart, snap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel__snapper {
    animation-name: none;
  }
}

.carousel:hover .carousel__snapper,
.carousel:focus-within .carousel__snapper {
  animation-name: none;
}

.carousel__navigation {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}

.carousel__navigation-list,
.carousel__navigation-item {
  display: inline-block;
}

.carousel__navigation-button {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #333;
  background-clip: content-box;
  border: 0.25rem solid transparent;
  border-radius: 50%;
  font-size: 0;
  transition: transform 0.1s;
}

.carousel::before,
.carousel::after,
.carousel__prev,
.carousel__next {
  position: absolute;
  top: 0;
  margin-top: 24.5%;
  width: 4rem;
  height: 4rem;
  transform: translateY(-50%);
  border-radius: 50%;
  font-size: 0;
  outline: 0;
}

.carousel::before,
.carousel__prev {
  left: -1rem;
}

.carousel::after,
.carousel__next {
  right: -1rem;
}

.carousel::before,
.carousel::after {
  content: '';
  z-index: 1;
  background-color: #333;
  background-size: 1.5rem 1.5rem;
  background-repeat: no-repeat;
  background-position: center center;
  color: #fff;
  font-size: 2.5rem;
  line-height: 4rem;
  text-align: center;
  pointer-events: none;
}

.carousel::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,50 80,100 80,0' fill='%23fff'/%3E%3C/svg%3E");
}

.carousel::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='100,50 20,100 20,0' fill='%23fff'/%3E%3C/svg%3E");
}





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
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
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
  background-color: rgba(182, 182, 182, 0.6);
  height: 27em;
  width: 48%;
  margin: 7px auto;
  border-radius: 3%;
  margin-top: 7%;
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
