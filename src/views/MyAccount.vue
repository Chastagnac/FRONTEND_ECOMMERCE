<template>
  <div class="page my-account">
    <div class="container is-max-desktop">
      <div>
        <h1 id="mytitlee">Mon espace</h1>
      </div>
      <li v-bind:key="index" v-for="(info , index) in info"></li>
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
              placeholder= prenom
              v-model="nom"
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
              v-model="prenom"
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
              readonly="readonly"
              v-model="email"
            />
          </div>
        </div>
        <button class="button2" v-on:click="updateUser()">
          Modifier mes informations
        </button>
      </div>
    </div>

    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyAccount",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',

      modif: true,
      info: null,
    };
  },
  methods: {

    mounted()
    {
      this.getUser();
    },

    logout() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
 
      this.$store.commit("removeToken");
      this.$router.push("/");
    },

    updateUser(){
        axios
        .post("/api/v1/users/reset_username/", formData)
        .then(response => {
            this.info = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUser(){
        axios.defaults.headers.common["Authorization"] = "";
        axios
        .get("/api/v1/users/me/?format=api")
        .then((response) => {
          this.info = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
#mytitlee {
  font-size: 40px;
  margin-bottom: 5%;
  color: black;
  font-weight: bold;
  text-align: center;
}

.labmya{
  text-align: left;
  margin-left:17%;
}
.nmya{
  margin-top: 1.3%;
}

#bmya {
  margin: auto;
  display: flex;
  margin-top: 4%;
}
input::placeholder {
        color: #1c87c9;
        opacity: 1;
      }
</style>