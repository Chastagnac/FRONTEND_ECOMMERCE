<template>
  <div>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <br /><br />
          <aside class="menu">
            <p class="menu-label">Devis <i class="fas fa-tags"></i></p>
            <ul class="menu-list">
              <li><span class="tag is-primary is-medium">Validé : 4</span></li>
              <li>
                <br />
                <span class="tag is-danger is-medium">Refusé : 2</span>
              </li>
              <br />
              <li>
                <span class="tag is-warning is-medium">En attente : 1</span>
              </li>
              <br />
            </ul>
          </aside>
        </div>
        <br />
        <div class="column is-9">
          <br />
          <article
            class="post box content"
            v-for="devis in devis"
            :key="devis.id"
          >
            <div class="columns">
              <div class="column is-1">
                <br />

                <i v-if="devis.status === 1" class="fas fa-check valide"></i>

                <i v-if="devis.status === 2" class="fas fa-times error"></i>

                <i v-if="devis.status === 0" class="fas fa-clock wait"></i>
              </div>
              <div class="column is-10">
                <h4><router-link :to="{ name: 'DevisView', params: { id: devis.id }}">{{ devis.object }}</router-link></h4>
                <div class="media">
                  <div class="media-left">
                    <p class="image is-32x32">
                      <img src="../assets/avatarmodified.png" />
                    </p>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <a href="#">@ {{ devis.email }}</a> &nbsp;
                        <span class="tag">{{ devis.category }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="media-right">
                    <span class="has-text-grey-light"
                      >Siret : {{ devis.siret }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { toast } from "bulma-toast";
import axios from "axios";

export default {
  name: "DevisClients",
  data() {
    return {
      devis: [],
    };
  },
  mounted() {
    this.getLatestQuote();
  },
  methods: {
    getLatestQuote() {
      axios
        .get("/api/v1/latest-quote/")
        .then((response) => {
          this.devis = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.valide {
    color : #00D1B2 !important;
}
.error {
    color : #F14668 !important;
}
.wait {
    color : #f3c64a !important;
}
</style>