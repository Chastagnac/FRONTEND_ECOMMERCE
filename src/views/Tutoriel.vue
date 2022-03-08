<template>
  <div class="tutoriel">
    <div class="bloctuto">
      <h2 class="mb-4 is-size-1 is-size-3-mobile" id="titletuto">Nos tutoriels</h2>
      <div>
        
        <div class="box zoombox">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64" id="imgtuto">
                <img class ="phototuto" src="../assets/savon.png" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Savon parfumé</strong>
                  <br />
                 Faites chauffer l'huile de coco à feu doux, jusqu'à ce que cela soit fondu - le mieux étant de le faire au bain-marie.
                </p>
              </div>
              <div class="mamodale">
                <mo
                  v-bind:re="re"
                  v-bind:displayModale="displayModale"
                >
                </mo>
                <button
                  v-on:click="displayModale"
                  class="button is-success"
                  id="btntuto"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </article>
        </div>

        
         <div class="box zoombox">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64" id="imgtuto">
                <img class ="phototuto" src="../assets/coton.png" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Faire un Tawashi</strong>
                  <br />
                  Vous ne savez pas quoi faire de vos chaussettes orphelines ? Ne les jetez plus, transformez-les en éponges lavables en tissu.
                </p>
              </div>
              <div class="mamodale">
                <modale
                  v-bind:revele="revele"
                  v-bind:toggleModale="toggleModale"
                >
                </modale>
                <button
                  v-on:click="toggleModale"
                  class="button is-success"
                  id="btntuto"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </article>
        </div>


      <div class="box zoombox">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64" id="imgtuto">
                <img class ="phototuto" src="../assets/pink.png" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Lessive Liquide Bio</strong>
                  <br />
                  Les ingrédients pour 3 litres de lessive
40 g de savon de Marseille (de couleur variant du vert pâle au brun, il doit être cuit au chaudron et contenir au minimum 72 % d’huiles végétales ;
                </p>
              </div>
              <div class="mamodale">
                <moda
                  v-bind:reveleuh="reveleuh"
                  v-bind:openModale="openModale"
                >
                </moda>
                <button
                  v-on:click="openModale"
                  class="button is-success"
                  id="btntuto"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </article>
        </div>
        
        <div class="box zoombox">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64" id="imgtuto">
                <img class ="phototuto" src="../assets/Churros.png" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Recette Churros</strong>
                  <br />
                 Dans une casserole, faites bouillir l'eau avec le beurre, le sel et 2 pincées de sucre. Tamisez la farine dans un saladier, creusez une fontaine et versez-y l'eau bouillante en remuant avec une cuillère en bois. Vous allez obtenir rapidement une pâte épaisse mais de texture homogène.

                </p>
              </div>
              <div class="mamodale">
                <mod
                  v-bind:reve="reve"
                  v-bind:ouvrirModale="ouvrirModale"
                >
                </mod>
                <button
                  v-on:click="ouvrirModale"
                  class="button is-success"
                  id="btntuto"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modalensvp4 from "../components/Modalensvp4.vue";
import Modalensvp3 from "../components/Modalensvp3.vue";
import Modalensvp2 from "../components/Modalensvp2.vue";
import Modalensvp1 from "../components/Modalensvp1.vue";

export default {
  name: "Tuto",
  data() {
    return {
      revele: false,
      reve:false,
      reveleuh:false,
      re:false,
    };
  },
  components: {
    modale: Modalensvp4,
    mod:Modalensvp3,
    moda: Modalensvp2,
    mo: Modalensvp1,
  },
  methods: {
    toggleModale: function () {
      this.revele = !this.revele;
    },
    ouvrirModale: function () {
      this.reve = !this.reve;
    },
    openModale: function () {
      this.reveleuh = !this.reveleuh;
    },
    displayModale: function () {
      this.re = !this.re;
    },
  },
};
</script>

<style scoped>

.phototuto{
  height: 100%;
}
.tutoriel {
  width: 80%;

  margin: auto;
  height: 100%;
}

#idtuto {
  text-align: center;
  display: flex;
  margin: auto;
  font-size: 30px;
  margin-bottom: 4%;
}
.bloctuto {
  margin: auto;
  width: 80%;
  background: white;
  display: grid;
}

#imgtuto {
  height: 150px;
  width: 150px;
}
.image.is-64x64 {
  height: 64px;
  width: 64px;
  position: inherit;
}
#btntuto {
  float: right;
  margin-right: 2%;
  position: inherit;
}
.overlay {
  background: rgba(63, 63, 63, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#titletuto{
  margin-top: 3%;
}
/*.zoombox:hover {
  transform: scale(1.01);
  border-style: groove;
  border-color: #62ca3b3b;
  transition: 0.3s;
}
*/
</style>