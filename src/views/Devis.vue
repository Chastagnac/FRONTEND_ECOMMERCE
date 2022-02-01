<template>
  <div class="devis">
    <div class="container is-max-desktop">
      <transition name="fade">
        <div
          class="column is-12 is-11-desktop mx-auto has-text-centered"
          v-if="!is_valide"
        >
          <h1 class="title is-1">Vous êtes ?</h1>
          <button
            class="button is-warning margin is-large"
            id="partic"
            v-on:click="(is_valide = true), (particulier = true)"
          >
            Particulier
          </button>
          <button
            class="button is-info margin is-large"
            id="prof"
            @click="(is_valide = true), (particulier = false)"
          >
            Professionnel
          </button>
        </div>
      </transition>
      <div
        class="column is-12 is-11-desktop mx-auto has-text-centered"
        v-if="is_valide"
      >
        <div>
          <h1 id="mytitle">Mon devis</h1>
        </div>
        <div class="columns is-multiline">
          <div
            class="column"
            v-bind:class="{ 'is-12': particulier, 'is-6': !particulier }"
          >
            <div class="field">
              <label class="label" id="pn">Nom et prénom</label>
              <div class="control">
                <input
                  class="input"
                  id="np"
                  type="text"
                  placeholder="Entrez votre nom et prénom"
                  v-model="data.name"
                />
              </div>
            </div>

            <div class="field">
              <label class="label" id="yourmail">Email</label>
              <div class="control">
                <input
                  class="input"
                  id="limae"
                  type="email"
                  placeholder="example@gmail.com"
                  v-model="data.email"
                />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field" v-if="!particulier">
              <label class="label">Raison sociale</label>
              <div class="control">
                <input
                  class="input"
                  id="rs"
                  type="text"
                  placeholder="Nom de votre entreprise"
                  v-model="data.raison_social"
                />
              </div>
            </div>

            <div class="field" v-if="!particulier">
              <label class="label">Numéro de siret</label>
              <div class="control">
                <input
                  class="input"
                  id="nds"
                  type="text"
                  placeholder="123 568 941 00056"
                  v-model="data.siret"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="columns is-multiline">
          <div class="column is-9">
            <div class="field">
              <label class="label" id="yourobject">Objet</label>
              <div class="control">
                <div class="control">
                  <input
                    class="input"
                    id="tejbo"
                    type="text"
                    placeholder="Définir l'objet"
                    v-model="data.message.object"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="select" id="drope" style="margin-top: 43px">
            <select v-model="data.message.categorie" id="fleche">
              <option disabled value="">Catégorie</option>
              <option>Alimentation</option>
              <option>Electronique</option>
              <option>Maison</option>
              <option>Jouet</option>
              <option>Textil</option>
              <option>Autre</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              id="msg"
              placeholder="Message"
              v-model="data.message.content"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" />
              J'ai lu et j'accepte les <a href="#">termes et conditions</a>
            </label>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control" id="mybutton">
            <button class="button is-link" id="colorbutt">
              Créer mon ticket de suivi<i
                class="fas fa-tags"
                style="margin-left: 10px; margin-top: 5px"
              ></i>
            </button>
          </div>
        </div>
      </div>
      {{ data }}
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Service",
  data() {
    return {
      particulier: "",
      data: {
        email: "",
        name: "",
        siret: null,
        raison_social: null,
        message: {
          categorie: "",
          object: "",
          content: "",
        },
      },
      is_valide: false,
    };
  },
  methods: {
    trigerPost() {},
  },
};
</script>

<style scoped>
#mytitle {
  font-size: 40px;
  margin-bottom: 5%;
  color: black;
  font-weight: bold;
}

.margin {
  margin: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.into-enter-active {
  animation: bounce-in 1s;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>

<style lang="scss">
#partic {
  background-color: #418014;
  color: #fff;
}
#prof {
  background-color: #418014;
  color: #fff;
}
#fleche {
  border-color: #418014;
}
#rs {
  border-color: #418014;
}
#nds {
  border-color: #418014;
}

#np {
  width: 642px !important;
  border-color: #418014;
}
#limae {
  width: 642px !important;
  border-color: #418014;
}
#tejbo {
  width: 440px !important;
  margin-right: 8%;
  border-color: #418014;
}

#drope {
  right: 10%;
  border-color: #418014;
}

#msg {
  display: block;
  max-width: 79%;
  min-width: 77%;
  padding: calc(0.75em - 1px);
  resize: vertical;
  left: 12%;
  border-color: #418014;
}
#pn {
  text-align: left;
  margin-left: 13%;
}
#yourmail {
  text-align: left;
  margin-left: 13%;
}
#yourobject {
  text-align: left;
  margin-left: 13%;
}
#mybutton {
  display: block;
  margin: auto;
}
#colorbutt {
  background: #418014;
}
</style>