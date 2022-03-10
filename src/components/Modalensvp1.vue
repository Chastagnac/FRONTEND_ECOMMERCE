<template>
  <div class="bloc-modale" v-if="re">
    <div v-on:click="displayModale" class="overlay"></div>

    <div class="box mod boxensvp">
      <div class="btnmodal">
        <div class="button buttonmodale" v-on:click="displayModale">X</div>
      </div>
      <div class="ensvp">
        <div id="imgtuto">
          <img class="imgmodtutosavon" src="../assets/savon.png" />
        </div>

        <strong id="textmdpoublie"> Savon parfumé</strong>

        <label id="renimdp"></label>
        <div class="field borderensvp">
          <div id="pad1">
            <div id="textetuto">
              <div>
                <h1 id ="textingr">Ingrédients:</h1>
                <div class = "ingred">
                  <div>
                  - 200 g d'huile de noix de coco <br />
                  - 200 g d'huile d'olive <br />- 70 g d'huile de chanvre<br />
                  - 30 g de beurre de karité
                </div>
                <div id ="ecartext">
                  - 71 g de NaOH
                  <br />- 160 g d'eau <br />- 30 gouttes d'huile essentielle de
                  néroli <br />- 10 gouttes d'huile essentielle de lavande
                </div>
                </div>
                <h1 id ="textingr"> Fabrication:</h1>
                <div>
                  - Faites chauffer l'huile de coco à feu doux, jusqu'à ce que cela soit fondu - le mieux étant de le faire au bain-marie. <br />
                  - Mélanger tous les ingrédients ensemble et verser le mélange dans un moule. <br />- Laissez le savon "veillilir" dans un endroit sec, frais et bien ventilé pendant les 8 semaines à venir : plus votre savon à de l'âge, meilleur il est !!<br />
                </div>
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
  name: "Modalensvp1",
  props: ["re", "displayModale"],
};
</script>
<style scoped>
#textingr{
  font-size: 30px;
  margin-bottom: 1%;
}
#ecartext{
  margin-left: 15%;
  margin-bottom: 2%;
}
.ingred{
  display: flex;
  flex-direction: row;
  margin: auto;
}
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

.imgmodtutosavon {
  height: 300px;
  width: 300px;
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
  float: right;
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
    top: 3%;
    width: 100%;
  }
}

@media only screen and (max-width: 692px) {
  .mod {
    height: 100%;
  }
}
</style>