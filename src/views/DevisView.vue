<template>
  <div>
    <br />
    <div class="container">
      <!-- START ARTICLE FEED -->
      <section class="articles">
        <p class="title" style="margin: auto">{{ devis.raison_sociale }}</p>
        <div class="column is-8 is-offset-2">
          <!-- START ARTICLE -->
          <div class="card article">
            <div class="card-content">
              <div class="media">
                <div class="media-content has-text-centered">
                  <p class="title article-title">{{ devis.object }}</p>
                  <div class="tags has-addons level-item">
                    <span class="tag is-rounded is-info"
                      >@ {{ devis.name }}</span
                    >
                    <span class="tag is-rounded"
                      >Categorie :{{ devis.category }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="content article-body">
                <p>{{ devis.content }}</p>
              </div>
            </div>
          </div>

          <button
            class="button is-success"
            style="margin: 20px"
            @click="accept()"
          >
            Accepter le devis
          </button>
          <button
            class="button is-danger"
            style="margin: 20px"
            @click="refus()"
          >
            Refuser le devis
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { toast } from "bulma-toast";
import axios from "axios";

export default {
  name: "DevisView",
  data() {
    return {
      devis: [],
    };
  },
  mounted() {
    this.getQuoteById();
  },
  methods: {

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

    refus(){
      const fromData = {
          status: -1,
        };

      const id = this.$route.params.id;
      axios
        .post(`/api/v1/latest-quote/${id}/`,fromData)
        .then((response) => {
          this.devis = response.data[0];
          this.toast_affiche("Devis Refusé","is-success");
           this.$router.push("/admin")
        })
        .catch((error) => {
          this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger")
          console.log(error);
        });
    },

    accept(){
      const fromData = {
          status: 1,
        };

      const id = this.$route.params.id;
      axios
        .post(`/api/v1/latest-quote/${id}/`,fromData)
        .then((response) => {
          this.toast_affiche("Devis Acceptée","is-success");
          this.devis = response.data[0];
          this.$router.push("/devis-clients")
        })
        .catch((error) => {
          this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger")
          console.log(error);
        });
    },

    getQuoteById() {
      const id = this.$route.params.id;
      axios
        .get(`/api/v1/latest-quote/${id}`)
        .then((response) => {
          this.devis = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
