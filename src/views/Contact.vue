<template>
  <div class="Contact">
    <div class="container is-max-desktop">
      <h2>
        <div>
        <br><br>
      </div>  
        <a class="tab-link active" data-ref="connexion"
          ><router-link id="connexionsign" to="/contact"
            >Contactez nous!
          </router-link></a
        >
      </h2>
      <form @submit.prevent="sendEmail">
      <div class="column is-12 is-11-desktop mx-auto has-text-centered">
        <div class="field" >
              <label class="label" id="yourmail">Nom et prénom</label>
              <div class="control">
                <input
                  class="input"
                  id="npcontact"
                  type="text"
                  placeholder="Entrez votre nom et prénom"
                  v-model="input.username"
                />
              </div>
            </div>
       <div>
        <br>
      </div>  
        <div class="field">
          <label class="label" id="yourmail">Adresse email</label>
          <div class="control">
            <input
              class="input"
              id="npcontact"
              type="email"
              placeholder="Exemple@gmail.com"
              v-model="input.email"
            />
          </div>
        </div>
      <div>
        <br>
      </div>    
        <div class="field">
          <label class="label" id="yourmail">Message</label>
          <div class="control">
            <textarea
              class="textarea"
              id="msg"
              type="text"
              placeholder="Décrivez nous votre besoin..."
              v-model="input.message"
            ></textarea>
          </div>
        </div>
      <div>
        <br>
      </div>  
         <div class="field">
          <div class="recaptcha">
            <div class="recaptcha-size">
              <vue-recaptcha           
                sitekey="6LejPlkeAAAAAEUqvF89i7wbLnS0QcC8UcNIr56e"
                @verify="captchaVerif"
              ></vue-recaptcha>
            </div>
          </div>
        </div>

        <button class="button2">
          Envoyer
        </button>
      </div>
      </form>
   </div>  
   

  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";
import { VueRecaptcha } from 'vue-recaptcha';
import emailjs from 'emailjs-com';

export default {
  name: "Contact",
  data() {
    return {
      input: {
        email:"",
        username: "",
        message: "",

        captcha_response: "",
      },
      errors: 0,
    };
  },
  components: { VueRecaptcha },

   mounted(){
        axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token");
        axios
        .get("/api/v1/users/me")
        .then((response) => {
          this.info = response.data;
          this.input.email = this.info.email;
        })
        .catch((error) => {
          console.log(error);
        });
     },

   methods: {

     sendEmail(e) {
       this.errors = 0;
       if(this.input.email == "")
       {
         this.errors = 1;
         this.toast_affiche("Veuillez entrer un email","is-danger");
       }
       if(this.input.username == "")
       {
         this.errors = 1;
         this.toast_affiche("Veuillez entrer un nom et prénom","is-danger");
       }
       if(this.input.message == "")
       {
         this.errors = 1;
         this.toast_affiche("Veuillez écrire un message","is-danger");
       }
        if(this.input.captcha_response == "")
        {
          this.errors = 1;
          this.toast_affiche("Veuillez valider le captcha","is-danger");
        }
       if(this.errors == 0)
       {
         var templateParams = {
          from_name: this.input.username,
          message: this.input.message,
          reply_to: this.input.email, 
        };

          try {
              emailjs.send("service_6qlvzj7","template_8n7jwzq",templateParams,"user_p5FbC98Zv7d6YKahXNvTf")
              this.toast_affiche("Votre demande à bien été prise en compte","is-success");
          } catch(error) {
            this.toast_affiche(error,"is-danger");
          }

          this.input.username = ''
          this.input.message = ''
       }        
    },

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
      this.input.captcha_response = response;
    },
   }
}
</script>

<style lang="scss">
#msg::placeholder {
  color: gray;
  opacity: 1;
}
#limaec {
  width: 56% !important;
  border-color: #418014;
}
#msgc {
  display: block;
  max-width: 79%;
  min-width: 56%;
  padding: calc(0.75em - 1px);
  resize: vertical;
  left: 22%;
  border-color: #418014;
}
#pnc {
  text-align: center;
  margin-left: 0%;
  margin-right: 50%;
}
#yourmailc {
  text-align: center;
  margin-right: 42%;
}
#objetc {
  text-align: center;
  margin-right: 50%;
}
#messagec {
  text-align: center;
  margin-right: 47%;
}

#npcontact {
  width: 76% !important;
  border-color: #418014;
}


@media only screen and (max-width: 793px) {
  #messagec {
    text-align: center;
    margin-right: 0%;
  }
  #pnc {
    text-align: center;
    margin-left: 0%;
    margin-right: 0%;
  }
  #yourmailc {
    text-align: center;
    margin-right: 0%;
  }
  #objetc {
    text-align: center;
    margin-right: 0%;
  }
}
@media only screen and (max-width: 566px) {
  #yourmail {
  text-align: center;
  margin-left: 0%;
}
}
</style>
