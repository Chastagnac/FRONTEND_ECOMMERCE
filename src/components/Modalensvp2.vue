<template>
  <div class="bloc-modale" v-if="reveleuh">
    <div v-on:click="openModale" class="overlay"></div>

    <div class="box mod boxensvp">
      <div class="btnmodal">
        <div class="button buttonmodale" v-on:click="openModale">X</div>
      </div>
      <div class="ensvp">
        <div id="imgtuto">
          <img class="imgmodtutopink" src="../assets/pink.png" />
        </div>

        <strong id="textmdpoublie">Lessive Liquide Bio</strong>

        <label id="renimdp"></label>
        <div class="field borderensvp">
          <div id="pad1">
            <div id="textetuto">
              <div>
                <h1 id="textingr">Ingrédients:</h1>
                <div class="ingred">
                  <div>
                    - 40 g de savon de Marseille(de couleur variant du vert pâle
                    au brun)<br />
                    - 3 c. à s. de bicarbonate de soude
                  </div>
                  <div id="ecartext">
                    - 3 litres d’eau
                    <br />- Quelques gouttes d’huile essentielle ou de fragrance
                    naturelle au choix (citron, lavande…)
                  </div>
                </div>
                <h1 id="textingr">Matériaux:</h1>
                <div class="ingred">
                  <div>
                  - Une râpe<br />
                  - Une casserole et une plaque ou un feu de cuisson<br />
                  </div>
                  <div id="ecartexte">
                                     - Des récipients pour stocker la lessive (bouteilles, bocaux,
                  etc.)<br />
                  - Un entonnoir<br />
                  </div>
                </div>
                <h1 id="textingr"></h1>
                <div>
                 <h1 id ="textingr"> Fabrication:</h1>
                <div>
                  1. Râpez 40 g de véritable savon de Marseille.<br/>

2. Faites-les fondre à feu doux dans 1 litre d’eau très chaude.<br/>

3. Mélangez bien.<br/>

4. Ajoutez 3 c. à s. de bicarbonate de soude.<br/>

5. Laissez reposer pendant 1 heure, puis allongez avec 1 litre d’eau tiède.<br/>

6. Le lendemain, allongez de nouveau avec 1 litre d’eau froide et mélangez bien.<br/>

7. Facultatif : pour parfumer, après refroidissement de la lessive, ajoutez quelques gouttes d’huile essentielle ou, mieux pour l’environnement, de fragrance naturelle.

<br/>8. Mettez en bouteille.<br/><br/>

Avant de lancer votre lave-linge, versez une demi-tasse à une tasse de lessive-maison dans le bac dédié.<br/>

Vous pouvez compléter le lavage en ajoutant 3 c. à s. de vinaigre d’alcool blanc, avec ou sans fragrance, dans votre bac d’adoucissant.
                </div>
                  

                  <br />
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
  name: "Modalensvp2",
  props: ["reveleuh", "openModale"],
};
</script>
<style scoped>
#textingr {
  font-size: 30px;
  margin-bottom: 1%;
}
#ecartext {
  margin-left: 15%;
  margin-bottom: 2%;
}
#ecartexte {
  margin-left: 19%;
  margin-bottom: 2%;
}
.ingred {
  display: flex;
  flex-direction: row;
  margin: auto;
}

.imgmodtutopink {
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