<template>
  <div class="bloc-modale" v-if="reve">
        <div v-on:click="ouvrirModale" class="overlay"></div>

      <div class="box mod boxensvp">
        <div class="btnmodal">
          <div class = "button buttonmodale" v-on:click="ouvrirModale">X</div>
        </div>
        <div class="ensvp">
          <div id="imgtuto">
            <img class="imgmodtuto" src="../assets/gel.png">
          </div>
          
             <strong id="textmdpoublie">gel hydroalcoolique </strong>
             
             <label id="renimdp"></label>
             
             <div class="field borderensvp">
         
              <div id ="pad1">
                <div id="textetuto">
              <div>
                <h1 id ="textingr">Ingrédients:</h1>
                <div class = "ingred">
                  <div>
                  -  Une bouteille de 500 ml <br />
                  - 40 cl d’alcool à 90°C <br />- 10 cl de gel d’aloe vera<br />- 1 cuillère à café d’huile végétale <br />
                </div>
                <div id ="ecartext">
                  - Récipient gradué propre et désinfecté
                  <br />- Une petite fiole <br />- Un entonnoir<br />
                </div>
                </div>
                <h1 id ="textingr"> Étapes à suivre:</h1>
                <div>
                  - Versez respectivement dans votre récipient gradué l’alcool, la glycérine ou le gel d’aloe vera et les gouttes d’huile essentielle.<br/>
                  - Mélangez délicatement à l’aide d’une spatule.<br/>
                  -  Transvasez dans votre petit récipient à l’aide d’un entonnoir pour stocker votre solution hydroalcoolique. Secouez pour mélanger.<br/>
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