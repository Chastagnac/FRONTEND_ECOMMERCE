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
         <div v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ toast_affiche(error) }}</p>
        </div>
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

      toasterrors: [],
      toasterrors2: [],

      errors: [],
      info: [],
    };
  },
  mounted(){
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

    toast_affiche(parametre){
       toast({
        message: parametre,
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: "top-right",
        animate: { in: 'fadeIn', out: 'fadeOut' },
      });
    },

    updateUser(){

      axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token");

      this.errors = [];
      if(this.password_actuel == "")
      {
        this.errors.push(`Afin de valider les modifications le mot de passe doit être renseigné`);
      }
      if (this.input.username == "") {
        this.errors.push(`Le nom d'utilisateur doit être renseigné`);
      }
      else if(!this.errors.lenght && this.input.username !== this.username_actuel)
      {
        const data = {
          current_password: this.password_actuel,
          new_username: this.input.username
        }
        axios
        .post("/api/v1/users/set_username/",data)
        .then(response => {
            toast({
              message: "Votre nom d'utilisateur à bien été modifié !",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: "bottom-right",
              animate: { in: 'fadeIn', out: 'fadeOut' },
            });
        })
        .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.toasterrors = `${error.response.data[property]}`;
                 toast({
                      message: this.toasterrors,
                      type: "is-danger",
                      dismissible: true,
                      pauseOnHover: true,
                      duration: 2000,
                      position: "bottom-right",
                      animate: { in: 'fadeIn', out: 'fadeOut' },
                    });
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }else if (this.input.username == this.username_actuel && !this.errors.lenght)
      {
        toast({
            message: "Aucune information n'a été modifiée",
            type: "is-info",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "top-right",
            animate: { in: 'fadeIn', out: 'fadeOut' },
          });
      }

      if (this.password_change != "") {

        if (this.input.password2 != this.input.password) 
        {
          this.errors.push(`Les mots de passe doivent être identiques`);
        }
        else if (!this.errors.lenght && this.password_change == this.password_change2 && this.password_change != this.password_actuel && this.password_change2 !== this.password_actuel)
        {
          const data = { 
          new_password: this.password_change,
          current_password: this.password_actuel,
          }
          axios
          .post("/api/v1/users/set_password/",data)
          .then(response => {
               toast({
                message: "Votre mot de passe à bien été modifié !",
                type: "is-success",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
                animate: { in: 'fadeIn', out: 'fadeOut' },
            });
          })
          .catch((error) => {
              if (error.response) {
                for (const property in error.response.data) {
                 this.toasterrors2 = `${error.response.data[property]}`;
                 toast({
                      message: this.toasterrors,
                      type: "is-danger",
                      dismissible: true,
                      pauseOnHover: true,
                      duration: 2000,
                      position: "bottom-right",
                      animate: { in: 'fadeIn', out: 'fadeOut' },
                    });
                }
                console.log(JSON.stringify(error.response.data));
              } else if (error.message) {
                this.errors.push("Something went wrong. Please try again");

                console.log(JSON.stringify(error));
              }
            });
        }
        else
        {
          this.errors.push(`Votre mot de passe est identique au mot de passe actuel`);
        }
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
  top: 14%;
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
}
</style>