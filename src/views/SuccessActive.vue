<template>
  <div>
    <div class="box" style="width: 50%; margin: auto">
      <article class="message is-info">
        <div class="message-header">
          <p>Activation</p>
        </div>
        <div class="message-body">
          Votre compte est en cours d'activation
          <br />
          <strong>Eco Service </strong>s'occupe de tout !
          <br />
          <br />
          Vous allez être redirigé ...
          <img src="../assets/logoblack.png" class="logo" alt="" />
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "successactive",

  data() {
    return {
      errors:0,
    };
  },

  mounted(){
     this.request();
  },

  methods:{
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

    request(){
        const formData = {
          uid: this.$route.query.uid,
          token: this.$route.query.token,
          new_password: this.password,
        };
        axios
          .post("api/v1/users/activation/", formData)
          .then((response) => {
            this.toast_affiche("Votre compte à bien été activé !","is-success");
            setTimeout(() => this.isHidden = false, 800);
            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                if(error.response.data[property] == "Token non valide.")
                {
                  this.toast_affiche("Votre lien est incorrect","is-danger"); 
                }
                if(error.response.data[property] == "Le jeton pour cet utilisateur est expiré.")
                {
                  this.toast_affiche("Votre lien à expiré","is-danger"); 
                }            
              };                     
              setTimeout(() => this.isHidden = false, 800);
              this.$router.push("/contact")
            } else if (error.message) {
              this.toast_affiche("Désolé. Un problème est survenu. Veuillez réessayer plus tard.","is-danger")                  
              this.$router.push("/contact")
            }
          });
    },
 
    mounted() {
      instance.showLoading({type: "line",});
      this.getLastedProducts();
      document.title = "Eco-Service";
    }
  },

};
</script>

<style scoped>
</style>