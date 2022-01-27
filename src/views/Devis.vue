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
            v-on:click="(is_valide = true), (particulier = true)"
          >
            Particulier
          </button>
          <button
            class="button is-info margin is-large"
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
        <div class="columns is-multiline">
          <div
            class="column"
            v-bind:class="{ 'is-12': particulier, 'is-6': !particulier }"
          >
            <div class="field">
              <label class="label">Nom et prénom</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Entrez votre nom et prénom"
                  v-model="data.name"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
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
              <label class="label">Objet</label>
              <div class="control">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="data.message.object"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="select" style="margin-top: 43px">
            <select v-model="data.message.categorie">
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
          <div class="control">
            <button class="button is-link">
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
      trigerPost() {
          
      }
  },
};
</script>

<style scoped>
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