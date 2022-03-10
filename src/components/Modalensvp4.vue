<template>
  <div class="bloc-modale" v-if="revele">
    <div v-on:click="toggleModale" class="overlay"></div>

    <div class="box mod boxensvp">
      <div class="btnmodal">
        <div class="button buttonmodale" v-on:click="toggleModale">X</div>
      </div>
      <div class="ensvp">
        <div id="imgtuto">
          <img class="imgmodtutocoton" src="../assets/coton.png" />
        </div>

        <strong id="textmdpoublie">Faire un Tawashi</strong>

        <label id="renimdp"></label>
        <div class="field borderensvp">
          <div id="pad1">
            <div>
            <div>
              <h1 id ="textingr">Outils & Objets:</h1>
                <div class = "ingred">
                  <div>
                  - Une planche en bois<br />
                  - Des clous <br />- Un marteau<br />

                </div>
                <div id ="ecartext">
                  - Une paire de ciseaux
                  <br />- Une règle <br />- Des chaussettes orphelines (idéalement des chaussettes de sport épaisses)
                </div>
                <div>
            </div>
                
                  
                </div>
                <h1 id ="textingr"> Fabrication:</h1>
                
                 - Faites chauffer l'huile de coco à feu doux, jusqu'à ce que cela soit fondu - le mieux étant de le faire au bain-marie. <br />
                  - Mélanger tous les ingrédients ensemble et verser le mélange dans un moule. <br />- Laissez le savon "veillilir" dans un endroit sec, frais et bien ventilé pendant les 8 semaines à venir : plus votre savon à de l'âge, meilleur il est !!<br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modalensvp4",
  props: ["revele", "toggleModale"],
};
</script>
<style scoped>
#textingr {
  font-size: 30px;
  margin-top: 1%;
}
#ecartext {
  margin-left: 15%;
  margin-bottom: 2%;
}
.ingred {
  display: flex;
  flex-direction: row;
  margin: auto;
}

.imgmodtutocoton {
  height: 300px;
  width: 300px;
}
.btnmodal {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 10%;
  text-align: right;
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
}
.mod {
  background: #f1f1f1;
  padding: 50px;
  position: fixed;
  top: 8%;
  width: 85%;
  height: 86%;
}
.buttonmodale {
  background: #f1f1f1;
  border: none;
}
#btnmodale {
  display: flex;
  margin: auto;
  margin-top: 2%;
  color: white;
}
#btnmodale:hover {
  background-color: #363636;
}
#renimdp {
  font-size: 12px;
}
#textmdpoublie {
  justify-content: center;
  display: flex;
  font-size: 148%;
  margin-bottom: 3%;
}
#mdpemail {
  font-size: 13px;
  font-weight: bold;
}
.mailmdp {
  width: 100% !important;
}
.mailmdp::placeholder {
  color: gray;
}
.mailmdp:active {
  border-color: gray;
  outline: none;
}

#imgtuto {
  display: flex;
  margin: auto;
  justify-content: center;
}

.boxensvp {
  width: 85%;
  overflow: auto;
}
.borderensvp {
  border: black;
  border-color: gainsboro;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}

#steptostep {
  white-space: normal;
  width: 100%;
  margin: auto;
  margin-bottom: auto;
  font-size: 26px;
  color: #979797;
  margin-bottom: 2%;
}

.textetuto {
  font-size: 15px;
  margin: 6px;
}

#pad1 {
  padding: 1%;
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