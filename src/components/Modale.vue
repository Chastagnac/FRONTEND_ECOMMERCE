<template>
  <div class="bloc-modale" v-if="revele">
    <div v-on:click="toggleModale" class="overlay"></div>
      <div class="box mod">
        <div class="btnmodal">
          <div class = "button buttonmodale" v-on:click="toggleModale">X</div>
        </div>
        <div>
          <form @submit.prevent="submitForm">
             <strong id="textmdpoublie"> Mot de passe oublié ? </strong>  
             <label id="renimdp"></label>
             <p style="white-space: normal; width: 100%; margin: auto; font-size: 14px;">Veuillez saisir votre email de connexion afin de recevoir le lien de réinitialisation de votre mot de passe.     </p>
             <div class="field">
            <label id="mdpemail">E-mail de connexion</label>
            <div class="control">
              <input
                type="email"
                class="mailmdp input" 
                placeholder="Entrez votre adresse email"
                v-model="email"
                :disabled="disabled"
              >
            </div>
            <button class="button" id="btnmodale">Envoyer</button>
        </div>
          </form>    
        </div>
       
        
      </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Modale",
  props: ["revele", "toggleModale"],
data(){
  return {
     email: "",
  }
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


    submitForm() {

      if (this.email === "") {
        this.toast_affiche(`Veuillez entrer un email`,'is-danger');
      }
      else{
        const formData = {
          email: this.email, 
        }
        axios
          .post("api/v1/users/reset_password/", formData)
          .then((response) => {
            this.toast_affiche("Lien de réinitialisation envoyé !","is-success");
            console.log(response)
            //this.$router.push("/log-in");
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
<style scoped>
.btnmodal {

  position: absolute;
 top: 0px;
right: 3px;
  width: 10%;
  text-align: center;
}
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 30px;
}
.mod {
background: #f1f1f1;
padding: 50px;
position: fixed;
top: 8%;
width: 85%;
height: 86%;
}
.buttonmodale{
    background: #f1f1f1;
    border: none;
}
#btnmodale{
    display: flex;
    margin:auto;
    margin-top:2%;
    color: white;
}
#btnmodale:hover{
    background-color:#363636;
}   
#renimdp{
    font-size: 12px;
}
#textmdpoublie{
justify-content: center;
display: flex;
font-size: 148%;
margin-bottom: 3%;
}
#mdpemail{
    font-size: 13px;
    font-weight: bold;
}
.mailmdp{
    width: 100% !important;
   
}
.mailmdp::placeholder {
  color: gray;
  
}
.mailmdp:active {
  border-color: gray;
  outline: none;
  
  
}
@media only screen and (max-width: 1200px) {
  .mod {
background: #f1f1f1;
padding: 50px;
position: fixed;
top: 8%;
width: 95%;
height: 96%;
}
}

</style>