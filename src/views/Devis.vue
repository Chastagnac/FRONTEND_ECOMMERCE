<template>
  <div class="devis">
    <div class="container is-max-desktop">
      <div class="column is-12 is-11-desktop mx-auto has-text-centered">
        <div>
          <h1 id="mytitle">Mon devis</h1>
        </div>
        <div class="columns is-multiline">
          <div
            class="column"
            v-bind:class="{ 'is-12': !particulier, 'is-6': !particulier }"
          >
            <div class="field" v-if="!particulier">
              <label class="label" id="pn">Nom et prénom</label>
              <div class="control">
                <input
                  class="input"
                  id="np"
                  type="text"
                  placeholder="Entrez votre nom et prénom"
                  v-model="data.name"
                />
              </div>
            </div>
            <div class="field" v-if="!particulier">
              <label class="label" id="yourmail">Email</label>
              <div class="control">
                <input
                  class="input"
                  id="limae"
                  type="email"
                  placeholder="example@gmail.com"
                  v-model="data.email"
                />
              </div>
            </div>
            <div class="field" v-if="particulier">
              <label class="label" id="pn">Nom et prénom</label>
              <div class="control">
                <input
                  class="input"
                  id="np"
                  type="text"
                  placeholder="Entrez votre nom et prénom"
                  v-model="data.name"
                />
              </div>
            </div>

            <div class="field" v-if="particulier">
              <label class="label" id="yourmail">Email</label>
              <div class="control">
                <input
                  class="input"
                  id="limae"
                  type="email"
                  placeholder="example@gmail.com"
                  v-model="data.email"
                />
              </div>
            </div>
          </div>

          <div id="parent">
            <div id="enfant">
              <div class="column is-6 raisonsociale">
                <div class="field child" id="rs">
                  <label class="label" id="lbrs">Raison sociale</label>
                  <div class="control">
                    <input
                      class="input rss"
                      id="rs"
                      type="text"
                      placeholder="Nom de votre entreprise"
                      v-model="data.raison_sociale"
                    />
                  </div>
                </div>

                <div class="field child" id="numsi">
                  <label class="label" id="lbnds">Numéro de siret</label>
                  <div class="control">
                    <input
                      class="input"
                      id="nds"
                      type="text"
                      placeholder="123 568 941 00056"
                      v-model="data.siret"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-9">
            <div class="field">
              <label class="label" id="yourobject">Objet</label>
              <div class="control">
                <div class="control">
                  <input
                    class="input"
                    id="tejbo"
                    type="text"
                    placeholder="Définir l'objet"
                    v-model="data.object"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="select" id="drope" style="margin-top: 43px">
            <select v-model="data.category" id="fleche">
              <option disabled value="">Catégorie</option>
              <option>Alimentation</option>
              <option>Electronique</option>
              <option>Maison</option>
              <option>Jouet</option>
              <option>Textil</option>
              <option>Autre</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              id="msg"
              placeholder="Message"
              v-model="data.content"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
          </div>                
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
         
        <div class="field is-grouped">
          <div class="control" id="mybutton">
            <button class="button is-link" id="colorbutt" @click="trigerPost()">
              Créer mon ticket de suivi<i
                class="fas fa-tags"
                style="margin-left: 10px; margin-top: 5px"
              ></i>
            </button>
          </div> 
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
  name: "Service",
  data() {
    return {
      captcha: false,
      data: {
        name: "",
        email: "",
        siret: "",
        raison_sociale: "",
        object: "",
        category: "",
        content: "",  
        captcha_response: "",    
      },     
      is_valide: false,
      errors: [],
    };
  },

  mounted(){
    this.mounted()
  },

  components: { VueRecaptcha },

  methods: {

    mounted(){
        document.title = "Devis";
        axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem("token");
        axios
        .get("/api/v1/users/me")
        .then((response) => {
          this.info = response.data;
          this.data.email = this.info.email;
        })
        .catch((error) => {
          console.log(error);
        });
     },

    captchaVerif( response ){
      this.data.captcha_response = response;
    },

    async trigerPost() {
      this.errors = [];
      if (this.data.name == "") {
        this.errors.push("Veuillez remplir le nom");
      }
      if (this.data.email == "") {
        this.errors.push("Veuillez remplir l'email");
      }
      if (this.data.object == "") {
        this.errors.push("Veuillez remplir l'objet");
      }
      if (this.data.category == "") {
        this.errors.push("Veuillez choisir une catégorie");
      }
      if (this.data.content == "") {
        this.errors.push("Veuillez remplir le contenu");
      }
      if(this.data.captcha_response == "")
      {
        this.errors.push("Veuillez cocher le captcha");
      }
      if (this.errors.length === 0) {
        await axios
          .post("/api/v1/latest-quote/", this.data)
          .then((response) => {
            this.$router.push("/service")
            toast({
              message:"Devis créé, votre dossier est en attente de validation !",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 10000,
              position: "top-right",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
          this.errors.forEach(element => {
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
    },
  },
};
</script>

<style scoped>

@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css);

.recaptcha{
    box-sizing: border-box;
    clear: both;
    font-size: 1rem;
    position: relative;
    text-align: -webkit-center;
}
.captchacenter{
  margin:auto;
  display: flex;
  justify-content: center;
}
#parent {
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
.child {
  display: inline-block;
  width: 73%;
  height: 100%;
}
#mytitle {
  font-size: 40px;
  margin-bottom: 5%;
  font-weight: bold;
}
#lbnds {
  text-align: left;
  margin-left: 2%;
}
#lbrs {
  margin-left: 16%;
  text-align: left;
}
.margin {
  margin: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.into-enter-active {
  animation: bounce-in 1s;
}
#rs {
  margin-left: 15%;
}
#numsi {
  margin-left: 20%;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
@media only screen and (max-width: 1023px) {
  .child {
    display: block;
    width: 100%;
    height: 100%;
  }
  #np {
    width: 56% !important;
    border-color: #418014;
  }
  #limae {
    width: 56% !important;
    border-color: #418014;
  }
  .rss {
    width: 91%;
    margin-left: 23%;
  }
  .rs {
    margin-left: 39%;
  }
  #pn {
    text-align: center;
    margin-left: 0%;
  }
  #yourmail {
    text-align: center;
    margin-left: 0%;
  }
  #yourobject {
    text-align: center;
    margin-left: 0%;
  }
  #lbrs[data-v-55d08eb5] {
    margin-left: 0%;
    text-align: center;
  }
  #lbnds[data-v-55d08eb5] {
    text-align: center;
    margin-left: 0%;
  }
  .child[data-v-55d08eb5] {
    display: block;
    width: 73%;
    margin-left: 57%;
  }
  #rs[data-v-55d08eb5] {
    width: 100%;
    margin-left: 0%;
    max-width: 100%;
    min-width: 56%;
  }
  #numsi[data-v-55d08eb5] {
    width: 100%;
    margin: auto;
    max-width: 100%;
    min-width: 100%;
  }
  #nds {
    border-color: #418014;
    width: 100%;
    max-width: 100%;
    min-width: 57%;
  }
  .raisonsociale {
    width: 100%;
  }
}
@media only screen and (max-width: 864px) {
  #tejbo {
    width: 483px !important;
    margin-right: 2%;
    border-color: #418014;
  }
  #pn {
    text-align: center;
  }
  #rs[data-v-55d08eb5] {
    width: 82%;
    margin: auto;
    max-width: 100%;
    min-width: 69%;
  }
  #numsi[data-v-55d08eb5] {
    width: 100%;
    margin: auto;
    max-width: 100%;
    min-width: 100%;
  }
  #nds {
    border-color: #418014;
    width: 100%;
    max-width: 100%;
    min-width: 57%;
  }
  #tejbo[data-v-55d08eb5] {
    width: 57% !important;
    margin-right: 0%;
    border-color: #418014;
  }
  .raisonsociale {
    width: 100%;
  }
}
@media only screen and (max-width: 496px) {
  #np[data-v-55d08eb5] {
    width: 100% !important;
    border-color: #418014;
  }
  #msg {
    display: block;
    padding: calc(0.75em - 1px);
    resize: vertical;
    width: 100%;
    left: 0%;
    border-color: #418014;
    max-width: 100%;
    min-width: 100%;
  }
  #drope {
    border-color: #418014;
    right: 25%;
  }
  #limae[data-v-55d08eb5] {
    width: 100% !important;
    border-color: #418014;
    margin-right: 12%;
  }
  #rs[data-v-55d08eb5] {
    width: 100%;
    margin: auto;
    max-width: 100%;
    min-width: 100%;
  }
  #numsi[data-v-55d08eb5] {
    width: 100%;
    margin: auto;
    max-width: 100%;
    min-width: 100%;
  }
  #nds {
    border-color: #418014;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  #tejbo[data-v-55d08eb5][data-v-55d08eb5] {
    width: 100% !important;
    margin-right: 0%;
    border-color: #418014;
  }
}
</style>
<style lang="scss">
#partic {
  background-color: #418014;
  color: #fff;
}
#prof {
  background-color: #418014;
  color: #fff;
}
#fleche {
  border-color: #418014;
}
#rs {
  border-color: #418014;
}
#nds {
  border-color: #418014;
}
#np {
  width: 642px !important;
  border-color: #418014;
}
#limae {
  width: 642px !important;
  border-color: #418014;
}
#tejbo {
  width: 440px !important;
  margin-right: 8%;
  border-color: #418014;
}
#drope {
  right: 10%;
  border-color: #418014;
}
#msg {
  display: block;
  max-width: 79%;
  min-width: 76%;
  padding: calc(0.75em - 1px);
  resize: vertical;
  left: 12%;
  border-color: #418014;
  box-shadow: 1px 0px 16px 7px rgba(0, 0, 0, 0.15);

}
#pn {
  text-align: left;
  margin-left: 13%;
}
#yourmail {
  text-align: left;
  margin-left: 13%;
}
#yourobject {
  text-align: left;
  margin-left: 13%;
}
#mybutton {
  display: block;
  margin: auto;
}
#colorbutt {
  background: #418014;
}
</style>

<style lang="scss">
#partic {
  background-color: #418014;
  color: #fff;
}
#prof {
  background-color: #418014;
  color: #fff;
}
#fleche {
  border-color: #418014;
}
#rs {
  border-color: #418014;
}
#nds {
  border-color: #418014;
}
#np {
  width: 642px !important;
  border-color: #418014;
}
#limae {
  width: 642px !important;
  border-color: #418014;
}
#tejbo {
  width: 440px !important;
  margin-right: 8%;
  border-color: #418014;
}
#drope {
  right: 10%;
  border-color: #418014;
}
#msg {
  display: block;
  max-width: 79%;
  min-width: 76%;
  padding: calc(0.75em - 1px);
  resize: vertical;
  left: 12%;
  border-color: #418014;
}
#pn {
  text-align: left;
  margin-left: 13%;
}
#yourmail {
  text-align: left;
  margin-left: 13%;
}
#yourobject {
  text-align: left;
  margin-left: 13%;
}
#mybutton {
  display: block;
  margin: auto;
}
#colorbutt {
  background: #418014;
}
</style>