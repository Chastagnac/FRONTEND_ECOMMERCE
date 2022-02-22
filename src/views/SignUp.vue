<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4" id="blur">
        <h2>
          <a
            class="tab-link active"
            data-ref="connexion"
            href="javascript:void(0)"
            ><router-link id="connexionsign" to="/log-in"
              >Connexion
            </router-link></a
          >
          <a
            class="tab-link active"
            data-ref="inscription"
            href="javascript:void(0)"
            ><router-link id="inscriptionsign" to="sign-up"
              >Inscription
            </router-link></a
          >
        </h2>

        <form @submit.prevent="submitForm">
          <div class="toutaligne">
               <div class="field">
            <label id="nomuse" for="nomuse">Nom d'utilisateur</label>
            <div class="control">
              <input
                type="text"
                id="holderi"
                class="input"
                placeholder="Nom d'utilisateur"
                v-model="username"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="field">
            <label id="email">E-mail</label>
            <div class="control">
              <input
                type="email"
                class="input"
                id="holderi"
                placeholder="Adresse email"
                v-model="email"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="field">
            <label id="mdp">Mot de passe</label>
            <div class="control">
              <input
                type="password"
                class="input"
                id="holderi"
                placeholder="Mot de Passe"
                v-model="password"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="field">
            <label id="rmdp">Répéter mot de passe</label>
            <div class="control">
              <input
                type="password"
                class="input"
                id="holderi"
                placeholder="Mot de Passe"
                v-model="password2"
                :disabled="disabled"
              />
            </div>
          </div>
          </div>
         
          <div class="field">
            <div class="control">
              <button class="button is-dark" id="btnsignup">S'inscrire</button>
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
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: [],
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
    submitForm() {
      this.errors = [];
      if (this.disabled === true) {
        this.errors.push(`Veuillez accepter les cookies`);
      }
      if (this.username === "") {
        this.errors.push(`Le nom d'utilisateur doit être renseigné`);
      }

      if (this.email === "") {
        this.errors.push(`Le mail doit être rempli`);
      }

      if (this.password === "") {
        this.errors.push(`Le mot de passe doit être renseigné`);
      }

      if (this.password2 !== this.password) {
        this.errors.push(`Les mots de passe doivent être identiques`);
      }

      if (!this.errors.lenght) {
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            toast({
              message: "Compte créé, veuillez vous connecter !",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}:${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>


<style lang="scss">
.page-sign-up {
  padding: 0;
  background-image: url("../assets/environnement-urbain.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  height: 44em;
}

.column.is-offset-4,
.column.is-offset-4-tablet {
  margin-left: 33.33333337%;
  background-color: rgba(182, 182, 182, 0.6);
  margin-top: 9%;
  border-radius: 30px;
}
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  #blur {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
  }
}
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
#blur{
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(6px);
  }
}


.tab-link {
  text-decoration: none;
  color: #141414;
  margin: 0px 5%;
  font-size: 26px;
  font-family: Arial, Helvetica, sans-serif;
}

.tab-link.active {
  font-weight: bold;
}

h2 {
  font-size: 100%;
  font-weight: normal;
  text-align: center;
}

#inscriptionsign {
  color: #6e934c;
  font-family: Arial, Helvetica, sans-serif;
  transition: 0.3s;
}
#inscriptionsign:hover {
  color: #6e934c;
  font-size: 25px;
}
#inscriptionsign:hover{
  color:#6E934C;
  font-size: 25px;
}

#connexionsign {
  color: #141414;
  transition: 0.3s;
}
#connexionsign:hover {
  color: #141414;
  font-size: 25px;
}
#connexionsign:hover{
  color:#141414;
  font-size: 25px;
}


.button {
  background-color: #517d2a;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
  align-content: center;
  text-align: center;
  left: 0%;
  border-radius: 14px;
}
.button.is-dark {
  background-color: #517d2a;
  border-color: transparent;
  color: #fff;
}
.textarea,
.input {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 50%;
}

#holderi::placeholder {
  color: gray;
  text-align: left;
}
.select select,
.textarea,
.input {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: black;
  text-align: left;
}
.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: center;
}
label {
  text-align: center;
  color: #333333;

  font-size: 19px;
}



.textarea,
.input {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 50%;
  background: white;
  background-color: white;
  border-radius: 10px;
}
.toutaligne{
 width: 48%;
margin: auto;
}
#btnsignup{
  margin-top: 2%;
}
</style>


