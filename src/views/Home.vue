<template>
  <div>
    <section class="section is-large">
      <br />
      <br />
      <div class="boxe">
        <h1 class="title">Large section</h1>
        <h2 class="subtitle">
          A simple container to divide your page into <strong>sections</strong>,
          like the one you're currently reading.
        </h2>
        <h2 class="subtitle">
          A simple container to divide your page into <strong>sections</strong>,
          like the one you're currently reading.
        </h2>

        <div>
          <button class="button">Découvrez nos services</button>
        </div>
      </div>
    </section>
    <section class="section is-medium">
      <div class="cont">
        <div class="columns">
          <div class="column">
            <h1 class="title">Large section</h1>
            <h2 class="subtitle">
              A simple container to divide your page into
              <strong>sections</strong>, like the one you're currently reading.
            </h2>
            <p>
              Lorem ipsum dolor sit amet. Et corrupti adipisci quo excepturi
              aperiam sed fugiat eaque eos voluptas autem ut natus voluptates et
              suscipit minima. Et eius minima ut ullam fugiat et similique
              voluptatem. Ut repudiandae voluptatem qui provident similique ut
              laborum obcaecati et dolorum maxime ad voluptatum qui alias
              tenetur. Est veniam nemo ut suscipit veritatis et voluptate
              repudiandae! Cum exercitationem sequi ex recusandae magni
              voluptatem architecto. Aut doloremque maxime est voluptatem dolor
              Quis animi vel doloremque enim. Quo quam expedita eum error
              tempore vel dignissimos nemo qui praesentiu
            </p>
          </div>
          <div class="column" id="droite"></div>
        </div>
      </div>
    </section>
    <!-- <section class="section is-medium">
    <div class="cont">
      <div class="columns">
        <div class="column">
          <h1 class="title">Large section</h1>
          <h2 class="subtitle">
            A simple container to divide your page into
            <strong>sections</strong>, like the one you're currently reading.
          </h2>
          <p>
            Lorem ipsum dolor sit amet. Et corrupti adipisci quo excepturi
            aperiam sed fugiat eaque eos voluptas autem ut natus voluptates et
            suscipit minima. Et eius minima ut ullam fugiat et similique
            voluptatem. Ut repudiandae voluptatem qui provident similique ut
            laborum obcaecati et dolorum maxime ad voluptatum qui alias tenetur.
            Est veniam nemo ut suscipit veritatis et voluptate repudiandae! Cum
            exercitationem sequi ex recusandae magni voluptatem architecto. Aut
            doloremque maxime est voluptatem dolor Quis animi vel doloremque
            enim. Quo quam expedita eum error tempore vel dignissimos nemo qui
            praesentiu
          </p>
        </div>
        <div class="column" id="droite"></div>
      </div>
    </div>
  </section> -->
    <div class="section" id="sect">
      <h1 class="title">Large section</h1>
      <h2 class="subtitle">
        A simple container to divide your page into <strong>sections</strong>,
        like the one you're currently reading.
      </h2>
    </div>

    <div class="containeuri">
      <div class="columns is-multiline">
        <ProductsBox
          v-for="product in lastestProducts"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
// @ = racourcie pour les components
import ProductsBox from "@/components/ProductsBox";
import Footer from "@/components/Footer";
export default {
  name: "Home",
  data() {
    return {
      lastestProducts: [],
    };
  },
  components: {
    ProductsBox,
    Footer,
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
          for (let i = 0; i < 4; i++) {
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
  background-image: url("../assets/environnement-urbain.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
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
  color: #4a4a4a;
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
.button {
  background-color: #418014;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
  align-content: center;
  text-align: center;
  left: 41%;
  border-radius: 14px;
}
.containeuri {
  padding-top: 207px;
  background-color: #f5f5f6;
}
#sect {
  background: #f5f5f6;
  height: 30em;
}

.boxe {
  background-color: rgba(182, 182, 182, 0.6);
  height: 26em;
  width: 48%;
  margin: 7px auto;
}
</style>
