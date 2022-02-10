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
            ><router-link id="connexionmya" to="/myaccount"
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
        <div
          class="column is-12 is-11-desktop mx-auto has-text-centered"
          v-if="modif"
        >
          <div class="field">
            <label class="label" id="nommya">Nom</label>
            <div class="control">
              <input
                class="input"
                id="npmya"
                type="text"
                placeholder="Entrez votre nom"
              />
            </div>
          </div>
          <div class="field">
            <label class="label" id="pnmya">Prénom</label>
            <div class="control">
              <input
                class="input"
                id="npmya"
                type="text"
                placeholder="Entrez votre prénom"
              />
            </div>
          </div>

          <div class="field">
            <label class="label" id="yourmailnma">Adresse email</label>
            <div class="control">
              <input
                class="input"
                id="npmya"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <button class="button2 buttmya" v-on:click="modif = false">
            Modifier mes informations
          </button>
        </div>
        <div class="field" v-if="!modif">
          <label class="label labmya nmya" id="nommya">Nom</label>
          <div class="control">
            <input
              class="input"
              id="npmya"
              type="text"
              placeholder="Veuillez entrer votre nouveau nom "
            />
          </div>
        </div>
        <div class="field" v-if="!modif">
          <label class="label labmya" id="pnmya">Prénom</label>
          <div class="control">
            <input
              class="input"
              id="npmya"
              type="text"
              placeholder="Veuillez entrer votre nouveau prénom"
            />
          </div>
        </div>
        <div class="field" v-if="!modif">
          <label class="label labmya" id="yourmailnma">Adresse email</label>
          <div class="control">
            <input
              class="input"
              id="npmya"
              type="text"
              placeholder="Veuillez entrer votre nouvelle adresse email"
            />
          </div>
        </div>
        <button
          class="button2 buttmya"
          v-if="!modif"
          v-on:click="modif = true"
          id="bmya"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyAccount",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',

      modif: true,
      info: null,
    };
  },
  methods: {



    logout() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
 
      this.$store.commit("removeToken");
      this.$router.push("/");
    },

    updateUser(){
        axios.defaults.headers.common["Authorization"] = "";
        axios
        .post("/api/v1/users/me/?format=api")
        .then(response => {
            this.info = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUser(){
        axios.defaults.headers.common["Authorization"] = "token" + localStorage.getItem("token");
        axios
        .get("/api/v1/users/me/?format=api")
        .then((response) => {
          this.info = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
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