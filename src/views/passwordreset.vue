
<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4" id="blur">
        <h2>
          <a
            class="tab-link active"
            data-ref="connexion"
            href="javascript:void(1)"
            ><label id="connexionsign" to=""
              >Réinitialisation du mot de passe
            </label></a
          >
        </h2>

        <form @submit.prevent="submitForm">
          <div class="toutaligne" style="margin-top : 10px">
          <div class="field">
            <label id="mdp">Nouveau Mot de passe</label>
            <div class="control">
              <input
                type="password"
                class="input"
                id="holderi"
                placeholder="*********"
                v-model="password"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="field">
            <label id="rmdp">Confirmez le mot de passe</label>
            <div class="control">
              <input
                type="password"
                class="input"
                id="holderi"
                placeholder="*********"
                v-model="password2"
                :disabled="disabled"
              />
            </div>
          </div>
          </div>
         

        <div class="field">
          <div class="recaptcha" style="margin-top : 10px">
            <div class="recaptcha-size">
              <vue-recaptcha           
                sitekey="6LejPlkeAAAAAEUqvF89i7wbLnS0QcC8UcNIr56e"
                @verify="captchaVerif"
              ></vue-recaptcha>
            </div>
          </div>
        </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark" id="btnsignup">Valider</button>
            </div>
          </div>
        </form> 
            <div v-if="errors.length">                                         
                  <p v-for="error in errors" v-bind:key="error">{{ toast_affiche(error,"is-danger") }}</p>
            </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import { toast } from "bulma-toast";
import { VueRecaptcha } from 'vue-recaptcha';

export default {
  name: "passwordreset",
  data() {
    return {
      password: "",
      password2: "",

      captcha_response: "",
      errors: 0,
      disabled: false,

      toasterrors: [],

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
        animate: { in: 'fadeIn', out: 'fadeOut' },
      });
    }
  },
  components: { VueRecaptcha },

  methods: {
    
    toast_affiche(parametre,type){
       toast({
        message: parametre,
        type: type,
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: "top-right",
        animate: { in: 'fadeIn', out: 'fadeOut' },
      });
    },

    captchaVerif( response ){
      this.captcha_response = response;
    },

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
      this.errors = 0;
      if (this.disabled === true) {
        this.errors = 1
        this.toast_affiche(`Veuillez accepter les cookies`,'is-danger');
      }

      if (this.password === "") {
        this.errors = 1
        this.toast_affiche(`Le mot de passe doit être renseigné`,'is-danger');
      }

      if (this.password2 !== this.password) {
        this.errors = 1
        this.toast_affiche(`Les mots de passe doivent être identiques`,'is-danger');
      }

      if(this.captcha_response == "")
      {
        this.errors = 1
        this.toast_affiche("Veuillez cocher le captcha",'is-danger');
      }

      if (!this.errors) {

        const formData = {
          uid: this.$route.query.uid,
          token: this.$route.query.token,
          new_password: this.password,
        };
        axios
          .post("api/v1/users/reset_password_confirm/", formData)
          .then((response) => {
            this.toast_affiche("Votre mot de passe à bien été modifié !","is-success");
            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.toast_affiche(`${error.response.data[property]}`,"is-danger");             
              };
                         
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger")
              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>


<style lang="scss" >

@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css);

.recaptcha{
    box-sizing: border-box;
    clear: both;
    font-size: 1rem;
    position: relative;
    text-align: -webkit-center;
}

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
  width: 100%;
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


