<template>
  <div class="footer">
    <img style="height: 150px" :src="require(`@/assets/logowhite.png`)" />

    <div class="contenue flexfooter">
      <div class="faqfoot bloc">
        <h1 id="tittlefooter">F.A.Q</h1>
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
        <details>
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
        <details>
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
        <details>
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

      <div class="col">
        <h1>Eco Service</h1>
        <ul>
          <router-link to="/contact"><li>Contact</li></router-link>
          <router-link to="/conditions-generales"
            ><li>Conditions générales</li></router-link
          >
          <router-link to="/service"><li>Services</li></router-link>
          <router-link to="/shop"><li>Produits</li></router-link>
        </ul>
      </div>

      <div class="col">
        <h1>Réseaux</h1>
        <ul>
          <li>
            <a href="https://www.instagram.com/eco_service13/"
              ><i class="fab fa-instagram fa-2x white"></i
            ></a>
          </li>
        </ul>
      </div>
      <div class="col">
        <h1>Eco Service</h1>
        <ul>
          <router-link to="/contact"><li>Accueil</li></router-link>
          <router-link to="/conditions-generales"
            ><li>Devis clients</li></router-link
          >
          <router-link to="/service"><li> Tutoriels</li></router-link>
          <router-link to="/shop"><li>F.A.Q</li></router-link>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isActive: false,
      isActiveuh: false,
    };
  },
};
</script>

<style scoped>

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




.footer[data-v-40ab164b] {
  height: max-content;
}
.footer {
  padding: 0rem 2.5rem 2rem;
}
.footer .col {
  width: auto;
  height: auto;
  float: left;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 0px 20px 20px 20px;
  margin-left: 5%;
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
  width: 50%;
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
@media only screen and (max-width: 769px) {
  .flexfooter {
    display: flex;
    margin-left: 0%;
    flex-direction: column;
  }
  .faqfoot[data-v-40ab164b] {
    width: 100%;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 10px;
  }
  .footer .col {
    width: 42%;
    text-align: center;
    margin: auto;
  }
}
</style>