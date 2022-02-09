<template>
  <div class="page-log-in">
    <div class="columns">
      <div v-if="isconnection" id="blure" class="column is-4 is-offset-4">
        <h2>
          <a
            class="tab-link active"
            data-ref="connexion"
            href="javascript:void(0)"
            ><router-link id="connexionlog" to="/log-in">Connexion </router-link></a
          >
          <a
            class="tab-link active"
            data-ref="inscription"
            href="javascript:void(0)"
            ><router-link id="inscriptionlog" to="sign-up"
              >Inscription
            </router-link></a
          >
        </h2>
        <br />
        <form @submit.prevent="submitForm">
          <div class="field">
            <label id = "nuse">Nom d'utilisateur</label>
            <div class="control">
              <input
                type="text"
                id="holderi"
                placeholder="Nom d'utilisateur"
                class="input"
                v-model="username"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="field">
            <label id ="nmdp">Mot de passe</label>
            <div class="control">
              <input
                type="password"
                id="holderi"
                placeholder="Mot de Passe"
                class="input"
                v-model="password"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Connexion</button>
            </div>
            <div class="control">
              <router-link style="color: black" to="/forget-password"
                >Mot de passe oublié ?
              </router-link>
            </div>
          </div>
        </form>
        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Log-in",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      isconnection: true,
      disabled: false,
    };
  },
  mounted() {
    if (!this.infoCookie()) {
      toast({
        message: `Veuillez acceptez les cookies pour pouvoir vous connecter`,
        type: "is-warning",
        dismissible: true,
        pauseOnHover: true,
        duration: 11000,
        position: "top-right",
      });
    }
  },
  methods: {
    infoCookie() {
      if (document.cookie[31] === "a") {
        this.disabled = false;
        return true;
      } else {
        this.disabled = true;
        return false;
      }
    },
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      if (this.disabled === true) {
        this.errors.push(`Veuillez accepter les cookies`);
      }
      const fromData = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post("/api/v1/token/login/", fromData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);
          this.$store.commit("addAccount", fromData);
          axios.defaults.headers.common["Authorization"] = "Token " + token;

          localStorage.setItem("token", token);

          const toPath = this.$route.query.to || "/";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>


<style lang="scss">
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  #blure {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
  }
}

#inscriptionlog{
  color:#141414;
}
#inscriptionlog:hover{
  color:#141414;
  font-size: 25px;
}
#connexionlog{
  color:#6E934C;
}
#connexionlog:hover{
  color:#6E934C;
  font-size: 25px;
}
.page-log-in {
  padding: 0;
  background-image: url("../assets/environnement-urbain.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  height: 44em;
}
#nuse{
    margin-left: 27%;
}
#nmdp{
    margin-left: 27%;
}

</style>