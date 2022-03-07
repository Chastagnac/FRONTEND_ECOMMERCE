<template>
  <div class="bloc-modale" v-if="reve">
        <div v-on:click="ouvrirModale" class="overlay"></div>

      <div class="box mod boxensvp">
        <div class="btnmodal">
          <div class = "button buttonmodale" v-on:click="ouvrirModale">X</div>
        </div>
        <div class="ensvp">
          <div id="imgtuto">
            <img class="imgmodtuto" src="../assets/Churros.png">
          </div>
          
             <strong id="textmdpoublie">Recette Churros</strong>
             
             <label id="renimdp"></label>
             
             <div class="field borderensvp">
         
              <div id ="pad1">
                <div id="textetuto">
              <div>
                <h1 id ="textingr">Ingrédients:</h1>
                <div class = "ingred">
                  <div>
                  - Eau <br />
                  - Beurre <br />- Sel<br />- Huile de pépin<br />
                </div>
                <div id ="ecartext">
                  - Sucre en poudre
                  <br />- Farine <br />- Cannelle<br />- Oeufs battus<br />
                </div>
                </div>
                <h1 id ="textingr"> Étapes à suivre:</h1>
                <div>
                  - Dans une casserole, faites bouillir l'eau avec le beurre, le sel et 2 pincées de sucre. <br/>- Tamisez la farine dans un saladier, creusez une fontaine et versez-y l'eau bouillante en remuant avec une cuillère en bois.<br/>
                  - Incorporez les œufs battus, mélangez et laissez la pâte reposer 1 h au frais.<br />- Faites chauffer l'huile de friture à 180°C. Mettez la pâte dans une poche à douille cannelée n° 10.<br/>
                  - Pressez des bandes de pâte de 10 cm de long, puis plongez-les dans la friture.<br />
                  - Opérez en plusieurs fois pour que les beignets ne collent pas les uns aux autres. Laissez-les dorer, retournez-les dans la friture avec l'écumoire.<br/>
                  - Retirez-les et égouttez-les sur du papier absorbant. Poudrez les churros de sucre en poudre et servez-les tièdes.
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
  name: "Modalensvp3",
  props: ["reve", "ouvrirModale"],
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

.imgmodtuto{
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
.buttonmodale{
    background: #f1f1f1;
    border: none;
}
#btnmodale{
    display: flex;
    margin:auto;
    margin-top:2%;
    color: white;
}
#btnmodale:hover{
    background-color:#363636;
}   
#renimdp{
    font-size: 12px;
}
#textmdpoublie{
justify-content: center;
display: flex;
font-size: 148%;
margin-bottom: 3%;
}
#mdpemail{
    font-size: 13px;
    font-weight: bold;
}
.mailmdp{
    width: 100% !important;
   
}
.mailmdp::placeholder {
  color: gray;
  
}
.mailmdp:active {
  border-color: gray;
  outline: none;
  
  
}

#imgtuto{
  display: flex;
margin: auto;
justify-content: center;
}

.boxensvp{
  width:85%;
  overflow: auto;
}
.borderensvp{
  border: black;
border-color: gainsboro;
border-style: solid;
border-width: 1px;
border-radius: 4px;
}

#steptostep{
 white-space: normal;
width: 100%;
margin: auto;
  margin-bottom: auto;
font-size: 26px;
color: #979797;
margin-bottom: 2%;
}

.textetuto{
  font-size: 15px;
margin: 6px;
}

#pad1{
  padding:1%;
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