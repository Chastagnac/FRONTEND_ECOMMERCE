<template>
    <div class="page commandes">
        <div class="container is-max-desktop">
      <div>
        <h1 id="mytitlee">Mon espace</h1>
      </div>
      <h2>
        <a
          class="tab-link active"
          data-ref="connexion"
          href="javascript:void(0)"
          ><router-link id="connexionsign" to="/myaccount"
            >Mes infos
          </router-link></a
        >
        <a
          class="tab-link active"
          data-ref="inscription"
          href="javascript:void(0)"
          ><router-link id="inscriptionsign" to="shop"
            >Mes commandes
          </router-link></a
        >
      </h2>
      <div
        class="column is-12 is-11-desktop mx-auto has-text-centered"
        v-if="modif"
      >
        <div class="field">
          <label class="label" id="pn">Nom</label>
          <div class="control">
            <input
              class="input"
              id="np"
              type="text"
              placeholder="Entrez votre nom"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" id="pn">Prénom</label>
          <div class="control">
            <input
              class="input"
              id="np"
              type="text"
              placeholder="Entrez votre prénom"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" id="yourmail">Adresse email</label>
          <div class="control">
            <input
              class="input"
              id="limae"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
        <button class="button2" v-on:click="(modif = false)">
          Modifier mes informations
        </button>
      </div>
      <div class="field" v-if="!modif">
        <label class="label labmya nmya" >Nom</label>
        <div class="control">
          <input
            class="input"
            id="np"
            type="text"
            placeholder="Veuillez entrer votre nouveau nom "
          />
        </div>
      </div>
      <div class="field" v-if="!modif">
        <label class="label labmya" >Prénom</label>
        <div class="control">
          <input
            class="input"
            id="np"
            type="text"
            placeholder="Veuillez entrer votre nouveau prénom"
          />
        </div>
      </div>
      <div class="field" v-if="!modif">
        <label class="label labmya">Adresse email</label>
        <div class="control">
          <input
            class="input"
            id="np"
            type="text"
            placeholder="Veuillez entrer votre nouvelle adresse email"
          />
        </div>
      </div>
      <button
        class="button2"
        v-if="!modif"
        v-on:click="(modif = true)" id="bmya"
      >
        Valider
      </button>
    </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "commandes",
  data() {
    return {
      modif: true,
      
    };
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");

      this.$store.commit("removeToken");
      this.$router.push("/");
    },
  },
};
</script>