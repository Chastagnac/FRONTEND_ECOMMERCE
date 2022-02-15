<template>
  <div class="Contact">
    <div class="container is-max-desktop">
      <h2>
        <a class="tab-link active" data-ref="connexion"
          ><router-link id="connexionsign" to="/contact"
            >Contact
          </router-link></a
        >
      </h2>
      <form @submit.prevent="submitForm">
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
        <div class="field">
          <label class="label" id="yourmail">Objet</label>
          <div class="control">
            <input
              class="input"
              id="npcontact"
              type="email"
              placeholder="Définir l'objet"
              v-model="input.object"
            />
          </div>
        </div>
        
        <div class="field">
          <label class="label" id="yourmail">Message</label>
          <div class="control">
            <textarea
              class="textarea"
              id="msg"
              placeholder="Décrivez nous votre besoin..."
              v-model="input.message"
            ></textarea>
          </div>
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

export default {
  name: "Contact",
  data() {
    return {
      input: {
        email:"",
        username: "",
        object:"",
        message: "",


        captcha_response: "",
        errors: [],
      }
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
       captchaVerif( response ){
      this.data.captcha_response = response;
    },

     submitForm(){
       this.errors = [];
      if (this.input.username == "") {
        this.input.errors.push(`Le nom d'utilisateur doit être renseigné`);
      }

      if (this.input.email == "") {
        this.input.errors.push(`Le mail doit être rempli`);
      }

      if (this.input.object == "") {
        this.input.errors.push(`Le mot de passe doit être renseigné`);
      }

      if (this.input.message == "") {
        this.input.errors.push(`Les mots de passe doivent être identiques`);
      }

      if(this.input.captcha_response == "")
      {
        this.input.errors.push("Veuillez cocher le captcha");
      }

      if (!this.errors.lenght) {
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
     }else
     {
       this.input.errors.forEach(element => {
            if(element != "")
            {
              toast({
                message: element,
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: "top-right",
                animate: { in: 'fadeIn', out: 'fadeOut' },
                });
            }
          });          
     }
   
   }

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
