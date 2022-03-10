<template>
  <div>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <br /><br />
          <aside class="menu">
            <p class="menu-label">Devis <i class="fas fa-tags"></i></p>
            <ul class="menu-list">
              <li><span class="tag is-primary is-medium">Validé : {{this.accepted}}</span></li>
              <li>
                <br />
                <span class="tag is-danger is-medium">Refusé : {{this.refused}}</span>
              </li>
              <br />
              <li>
                <span class="tag is-warning is-medium">En attente : {{this.waiting}}</span>
              </li>
              <br />
            </ul>
          </aside>
        </div>
        <br />
        <div class="column is-9">
          <br />
                  <h1 id="titleclient">Devis clients</h1>
          <article
            class="post box content boxzoom"
            v-for="devis in devis"
            :key="devis.id"
          >
            <div class="columns">
              <div class="column is-1">
                <br />

                <i v-if="devis.status === 1" class="fas fa-check valide"></i>

                <i v-if="devis.status === -1" class="fas fa-times error"></i>

                <i v-if="devis.status === 0" class="fas fa-clock wait"></i>
              </div>
              <div class="column is-10">
                <h4 ><router-link id ="colortitle" :to="{ name: 'DevisView', params: { id: devis.id }}">{{ devis.object }}</router-link></h4>
                <div class="media">
                  <div class="media-left">
                    <p class="image is-32x32">
                      <img src="../assets/avatarmodified.png" />
                    </p>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <a id ="colormail" href="#">@ {{ devis.email }}</a> &nbsp;
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
      accepted : 0,
      refused : 0,
      waiting : 0,
      
    };
  },
  mounted() {
    document.title = "Devis Client";
    this.getLatestQuote();
  },
  methods: {


    getLatestQuote() {
      axios
        .get("/api/v1/latest-quote/")
        .then((response) => {
          this.devis = response.data;
          this.devis.forEach(element => {
          if(element['status'] == 1)
          {
            this.accepted = this.accepted + 1;
          }
          else if (element['status'] == -1)
          {
            this.refused = this.refused + 1;
          }
          else
          {
            this.waiting += 1;
          }
         });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#colormail{
  color:gray;
}
#colortitle{
  color:#4a4a4a;
}
#titleclient{
  font-size: 50px;
  text-align: center;
  margin-bottom: 3%;
  font-weight: bold;
    margin-top: 1%;
}
.valide {
    color : #00D1B2 !important;
}
.error {
    color : #F14668 !important;
}
.wait {
    color : #f3c64a !important;
}

.boxzoom {
  transition: 0.3s;
  border-style: groove;
  border-color: #1d3d113b;
}
.boxzoom:hover {
  transform: scale(1.03);
  border-style: groove;
  border-color: #62ca3b3b;
}
</style>