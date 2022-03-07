<template>
  <div class="page my-account">
    <div class="container is-max-desktop">
      <div>
        <h1 id="mytitleee">Mon espace</h1>
      </div>

      <div class="boxemya">
        <div class="avatarrond">
          <img id="imavatar" src="../assets/avatarmodified.png" />
        </div>
        <h2>
          <a
            class="tab-link active"
            data-ref="connexion"
            href="javascript:void(0)"
            ><router-link id="connexionmya" to="/my-account"
              >Mes infos
            </router-link></a
          >
          <a
            class="tab-link active"
            data-ref="inscription"
            href="javascript:void(0)"
            ><router-link id="inscriptionmya" to="shop"
              >Mes commandes
            </router-link></a
          >
        </h2>
        <div class="column is-12 is-11-desktop mx-auto has-text-centered">
            <div class="field">
              <label class="label" id="nommya">Nom d'utilisateur</label>
              <div class="control">
                <input
                  class="input"
                  id="npmya"
                  type="text"
                  v-model="input.username"/>
              </div>
            </div>
          
        <form @submit.prevent="updateUser">
            <div class="field">
              <label class="label" id="yourmailnma">Adresse email</label>
              <div class="control">
                <input
                readonly="readonly"
                  class="input"
                  id="npmya"
                  type="email"
                  v-model="input.email"
                />
              </div>
            </div>
            
            <div class="field">
                <label class="label" id="pnmya">Mot de Passe Actuel</label>
                <div class="control">
                  <input
                    class="input"
                    id="npmya"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    v-model="password_actuel"/>        
                </div>
            </div>

            <div class="field">
                <label class="label" id="pnmya">Nouveau Mot de Passe</label>
                <div class="control">
                  <input
                    class="input"
                    id="npmya"
                    type="password"
                    placeholder="Entrez un nouveau mot de passe"
                    v-model="password_change"/>        
                </div>
            </div>

            <div class="field">
                <label class="label" id="pnmya">Confirmation Mot de Passe</label>
                <div class="control">
                  <input
                    class="input"
                    id="npmya"
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    v-model="password_change2"/>
                </div>
            </div>

            <button class="button2" id="bmya">
                    Valider
            </button>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "MyAccount",
  data() {
    return {
      
      input: {
        username: '',
        email: '',
      },

      username_actuel: '',
      password_actuel: '',
      password_change: '',
      password_change2: '',

      errors: 0,
      info: [],
    };
  },
  mounted(){
      document.title = "Mon Compte";
      axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token");
      axios
      .get("/api/v1/users/me")
      .then((response) => {
        this.info = response.data;
        this.input.email = this.info.email;
        this.input.username = this.info.username;

        this.username_actuel = this.info.username;
      })
      .catch((error) => {
        console.log(error);
      });
  },
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

    updateUser(){

      axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token");

      this.errors = 0;
      if(this.password_actuel == "")
      {
        this.errors = 1;
        this.toast_affiche(`Afin de valider les modifications le mot de passe doit être renseigné`,"is-danger");
      }
      if (this.input.username == "") {
        this.errors = 1;
        this.toast_affiche(`Le nom d'utilisateur doit être renseigné`,'is-danger');
      }
      else if(this.errors == 0 && this.input.username != this.username_actuel)
      {
        this.errors = 1;
        const data = {
          current_password: this.password_actuel,
          new_username: this.input.username
        }
        axios
        .post("/api/v1/users/set_username/",data)
        .then(response => {
            this.toast_affiche("Votre nom d'utilisateur à bien été modifié !","is-success");
        })
        .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors = 0;
                this.toast_affiche(`${error.response.data[property]}`,"is-danger");
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger");
              this.errors = 0;
              console.log(JSON.stringify(error));
            }
          });
      }

      if (this.password_change != "") {

        if (this.input.password2 != this.input.password) 
        {
          this.errors = 1;
          this.toast_affiche(`Les mots de passe doivent être identiques`,'is-danger');
        }
        else if (this.errors == 0 && this.password_change != this.password_actuel && this.password_change2 !== this.password_actuel)
        {
          this.errors = 1;
          const data = { 
          new_password: this.password_change,
          current_password: this.password_actuel,
          }
          axios
          .post("/api/v1/users/set_password/",data)
          .then(response => {
              this.toast_affiche("Votre mot de passe à bien été modifié !","is-success");
            })
          .catch((error) => {
              if (error.response) {
                for (const property in error.response.data) {
                 this.toast_affiche(`${error.response.data[property]}`,"is-danger");
                this.errors = 0;
                }
                console.log(JSON.stringify(error.response.data));
              } else if (error.message) {
                 this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger");
                 this.errors = 0;
                console.log(JSON.stringify(error));
              }
            });
        }
        else
        {
          this.errors = 1;
          this.toast_affiche(`Votre mot de passe est identique au mot de passe actuel`,'is-danger');
        }
      }

      if(this.errors == 0)
      {
        this.errors = 0;
        this.toast_affiche("Aucune information n'a été modifiée","is-info")
      }
    },
  },
};
</script>

<style lang="scss">

@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css);

.boxemya {
  width: 74%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(182, 182, 182, 0.6);
  border-radius: 30px;
}
.avatarrond {
  margin: auto;
  display: flex;
  justify-content: center;
}
#imavatar {
  position: absolute;
  top: 10%;
}
#connexionmya {
  float: left;
  margin-left: 17%;
  color: #6e934c;
}
#inscriptionmya {
  float: right;
  color: #141414;
  margin-right: 5%;
}
#mytitleee {
  font-size: 40px;
  margin-bottom: 9%;
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
#npmya {
  width: 46% !important;
  border-color: #418014;
}
#nommya {
  text-align: left;
  margin-left: 28%;
}
#yourmailnma {
  text-align: left;
  margin-left: 28%;
}
#pnmya {
  text-align: left;
  margin-left: 28%;
}
@media only screen and (max-width: 840px) {
#imavatar {
  position: initial;
  top: 0%;
  margin-top: 1%;
}

}
@media only screen and (max-width: 706px) {
 #inscriptionmya {
  float: right;
  color: #141414;
  margin-right: 31%;
  margin-bottom: 3%;
  margin-left: 18%;
}
#connexionmya {
  float: initial;
  margin-left: 8%;
  color: #6e934c;
}
}
@media only screen and (max-width: 592px) {
  #nommya {
    text-align: center;
    margin-left: 0%;
  }
  #yourmailnma {
    text-align: center;
    margin-left: 0%;
  }
  #pnmya {
    text-align: center;
    margin-left: 0%;
  }
 #inscriptionmya {
  float: right;
  color: #141414;
  margin-right: 31%;
  margin-bottom: 3%;
  margin-left: 18%;
}
.buttmya{
  font-size: 14px;
}
}
@media only screen and (max-width: 592px) {
  #npmya {
  width: 100% !important;
  border-color: #418014;
}
}
</style>