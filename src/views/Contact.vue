<template>
  <div class="Contact">
<h1 id ="titleSupport">Support</h1>
    <div class="endeux">
       <div class = "container leftcont">
<h1 id="titlefaq">F.A.Q</h1>
        <div class="faqfoot bloc">
        <details class="border-2 rounded">
          <summary>Qu'est-ce que le Lorem Ipsum?</summary>
          <div class="reponsefoot">
            <label id="idrep"
              >Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années 1500,
              quand un imprimeur anonyme assembla ensemble des morceaux de texte
              pour réaliser un livre spécimen de polices de texte.
            </label>
          </div>
        </details>
        <details class="border-2 rounded">
          <summary>Pourquoi l'utiliser?</summary>
          <div class="reponsefoot">
            <label id="idrep"
              >On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte.</label
            >
          </div>
        </details>
        <details class="border-2 rounded">
          <summary>Où puis-je m'en procurer?</summary>
          <div class="reponsefoot">
            <label id="idrep"
              >Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou
              là, mais la majeure partie d'entre elles a été altérée par
              l'addition d'humour ou de mots aléatoires qui ne ressemblent pas
              une seconde à du texte standard.</label
            >
          </div>
        </details>
        <details class="border-2 rounded">
          <summary>D'où vient-il?</summary>
          <div class="reponsefoot">
            <label id="idrep"
              >Contrairement à une opinion répandue, le Lorem Ipsum n'est pas
              simplement du texte aléatoire. Il trouve ses racines dans une
              oeuvre de la littérature latine classique datant de 45 av. J.-C.,
            </label>
          </div>
        </details>
      </div>

       </div>
      <div class="container is-max-desktop rightcont">
      <h2>
        <div>
        
      </div>  
        <h1 id="titlefaq">Contactez nous !</h1>
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
              <div class="captchacenter">
                <vue-recaptcha           
                sitekey="6LejPlkeAAAAAEUqvF89i7wbLnS0QcC8UcNIr56e"
                @verify="captchaVerif"
              ></vue-recaptcha>
              </div>
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
details[open] > div {
  animation: fade 0.3s ease-in-out;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
#titleSupport{
  text-align: center;
  font-size: 45px;
  margin-top: 2%;
}
.captchacenter{
  margin:auto;
  display: flex;
  justify-content: center;
}
.rightcont{
  background: white;
margin-top: 3%;
border-radius: 35px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
}

.rounded {
  box-shadow: 1px 0px 16px 7px rgba(0, 0, 0, 0.15);
  border-radius: 5PX;
  margin: 10px;
    margin-top: 10px;
  padding: 7px;
  margin-top: 4%;
  border-color: #418014;
  border-style: solid;
  border-width: 1px;
}
#tittlefooter {
  text-align: center;
  font-size: 30px;

  color: white;
}
.bloc {
  word-wrap: break-word;
}

.faqfoot {
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
}
details[data-v-40ab164b] {
  background: #fefefe;
  border-radius: 7px;

  margin-top: 2%;

  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #ededed;
}

.reponsefoot {
  background: #f1f1f5;
}

#idrep {
  text-align: center;
  color: #333333;
  font-size: 13px;
  margin-left: 0%;
  padding: 10px;
  font-style: italic;
}
.flexfooter {
  display: flex;
  margin-left: 0%;
}
#titlefaq{
 
font-size: 29px;
text-align: center;
font-family: Poppins;
}
.endeux {
 display: flex;
/*background-color: rgba(0, 2, 2, 0.1);*/
border-radius: 66px;
margin-top: 2%;
margin-left: 2%;
margin-right: 2%;

}
.leftcont{
  width: 24%;
  margin-left:3%;
  background: white;
height: 36%;
margin-top: 2%;
border-radius: 30px;
padding: 5px;
margin-bottom: 1.7%;
}
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
    box-shadow: 1px 0px 16px 7px rgba(0, 0, 0, 0.15);

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
    box-shadow: 1px 0px 16px 7px rgba(0, 0, 0, 0.15);

}

@media only screen and (max-width: 864px) {
  .endeux{
    flex-direction: column;
  }
  .leftcont {
  width: 96%;
  }
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
