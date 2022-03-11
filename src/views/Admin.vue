<template>
  <div>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <br /><br />
          <aside class="menu">
            <p class="menu-label">Devis <i class="fas fa-tags"></i></p>
            <ul class="menu-list">
              <li>
                <span class="tag is-primary is-medium"
                  >Validé : {{ this.accepted }}</span
                >
              </li>
              <li>
                <br />
                <span class="tag is-danger is-medium"
                  >Refusé : {{ this.refused }}</span
                >
              </li>
              <br />
              <li>
                <span class="tag is-warning is-medium"
                  >En attente : {{ this.waiting }}</span
                >
              </li>

              <br />
            </ul>
            <p class="menu-label">Porduits <i class="fas fa-tags"></i></p>
            <ul class="menu-list">
              <li>
                <button
                  class="button is-success is-rounded"
                  @click="triggerAddProduct()"
                >
                  Ajouter un produit
                </button>
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
                <h4>
                  <router-link
                    id="colortitle"
                    :to="{ name: 'DevisView', params: { id: devis.id } }"
                    >{{ devis.object }}</router-link
                  >
                </h4>
                <div class="media">
                  <div class="media-left">
                    <p class="image is-32x32">
                      <img src="../assets/avatarmodified.png" />
                    </p>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <a id="colormail" href="#">@ {{ devis.email }}</a>
                        &nbsp;
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
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Ajouter un Produit</p>
          <button class="delete" aria-label="close"></button>
        </header>

        <section class="modal-card-body">
          <div class="field" style="margin: auto">
            <div class="control">
              <div class="select" type="number">
                <select v-model="data.category">
                  <option value="0">Categorie</option>
                  <option value="1">Alimentation</option>
                  <option value="2">Électronique</option>
                  <option value="3">Jouets</option>
                  <option value="4">maison</option>
                  <option value="5">Textile</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" id="yourobject">Nom</label>
            <div class="control">
              <div class="control">
                <input
                  class="input"
                  id="tejbo"
                  type="text"
                  placeholder="Trottinette électrique"
                  v-model="data.name"
                />
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" id="yourobject">Url</label>
            <div class="control">
              <div class="control">
                <input
                  class="input"
                  id="tejbo"
                  type="text"
                  placeholder="trotinette-electrique"
                  v-model="data.slug"
                />
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" id="yourobject">Description</label>
            <div class="control">
              <div class="control">
                <input
                  class="input"
                  id="tejbo"
                  type="text"
                  placeholder="Cette trotinette à une puissance de 350W"
                  v-model="data.description"
                />
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" id="yourobject">Prix</label>
            <div class="control">
              <div class="control">
                <input
                  class="input"
                  id="tejbo"
                  type="number"
                  placeholder="100€"
                  v-model="data.price"
                />
              </div>
            </div>
          </div>
          <!-- data {{ data }} -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="trigerPost()">
            Ajouter le produit
          </button>
          <button class="button" @click="cancel">Retour</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "bulma-toast";
import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      devis: [],
      data: {
        category: 0,
        name: "",
        slug: "",
        description: "",
        price: "",
      },
      accepted: 0,
      refused: 0,
      waiting: 0,
      showModal: false,
    };
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Token " + localStorage.getItem("token");
    this.getLatestQuote();
  },
  methods: {
    getLatestQuote() {
      axios
        .get("/api/v1/latest-quote/")
        .then((response) => {
          this.devis = response.data;
          this.devis.forEach((element) => {
            if (element["status"] == 1) {
              this.accepted = this.accepted + 1;
            } else if (element["status"] == -1) {
              this.refused = this.refused + 1;
            } else {
              this.waiting += 1;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    triggerAddProduct() {
      this.showModal = true;
    },
    async trigerPost() {
      const formData = {
        category: parseInt(this.data.category),
        name: this.data.name,
        slug: this.data.slug,
        description: this.data.description,
        price: this.data.price,
      };
      await axios
        .post("/api/v1/latest-products/", formData)
        .then((response) => {
          this.$router.push("/service");
          toast({
            message: "Produit bien ajouté !",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 10000,
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
#colormail {
  color: gray;
}
#colortitle {
  color: #4a4a4a;
}
#titleclient {
  font-size: 50px;
  text-align: center;
  margin-bottom: 3%;
  font-weight: bold;
  margin-top: 1%;
}
.valide {
  color: #00d1b2 !important;
}
.error {
  color: #f14668 !important;
}
.wait {
  color: #f3c64a !important;
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