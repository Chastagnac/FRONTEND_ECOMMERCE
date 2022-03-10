<template>
  <div class="page-log-in">
    <div class="columns">
      <div v-if="isconnection" id="blure" class="column is-4 is-offset-4">
        <h2>
          <a
            class="tab-link active"
            data-ref="connexion"
            href="javascript:void(0)"
            ><router-link id="connexionlog" to="/log-in"
              >Connexion
            </router-link></a
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
          <div class="toutaligne">
            <div class="field">
              <label id="nuse">Nom d'utilisateur</label>
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
              <label id="nmdp">Mot de passe</label>
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
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark" style="margin-top: 2%">
                Connexion
              </button>
            </div>
          </div>
        </form>

        <div class="mamodale">
          <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale">
          </modale>
          <a id="mdpoublie" v-on:click="toggleModale">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import Modale from "@/components/Modale.vue";

export default {
  name: "Log-in",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      isconnection: true,
      disabled: false,
      toasterrors: [],
      revele: false,
    };
  },
  components: {
    modale: Modale,
  },
  mounted() {
    if (!this.infoCookie()) {
      toast_affiche("Veuillez acceptez les cookies pour pouvoir vous connecter","is-warning");
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

    toast_affiche(parametre, type) {
      toast({
        message: parametre,
        type: type,
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: "top-right",
        animate: { in: "fadeIn", out: "fadeOut" },
      });
    },

    async submitForm() {

      if(this.username == "")
      {
       this.toast_affiche("Veuillez entrer un nom d'utilisateur","is-danger");
      }
      if(this.password == "")
      {
        this.toast_affiche("Veuillez entrer un mot de passe","is-danger");
      }
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      if (this.disabled === true) {
        this.toast_affiche(`Veuillez accepter les cookies`, "is-danger");
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
          this.toast_affiche("Vous êtes connecté", "is-info");
          const toPath = this.$route.query.to || "/";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.toast_affiche(`${error.response.data[property]}`,"is-danger");             
            }
          } else {
             this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger");
            console.log(JSON.stringify(error));
          }
        });
    },
    toggleModale: function () {
      this.revele = !this.revele;
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

#inscriptionlog {
  color: #141414;
  transition: 0.3s;
}
#inscriptionlog:hover {
  color: #141414;
  font-size: 25px;
}
#connexionlog {
  color: #6e934c;
  transition: 0.3s;
}
#connexionlog:hover {
  color: #6e934c;
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

#mdpoublie {
  display: flex;
  color: black;
  text-align: center;
  margin-top: 20px;
  justify-content: center;
  text-decoration: underline;
}

@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 769px) {
  #blure {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
    margin-left: 0%;
  }
  #blur {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
    margin-left: 0%;
    position: sticky;
    top: 9%;
  }
}
@media only screen and (max-width: 452px) {
}
@media only screen and (max-width: 300px) {
  #mdpoublie {
    display: flex;
    color: black;
    text-align: center;
    margin-top: 20px;
    justify-content: center;
    text-decoration: underline;
  }
  #blur {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
    margin-left: 0%;
    position: sticky;
    top: 9%;
  }
}
</style>