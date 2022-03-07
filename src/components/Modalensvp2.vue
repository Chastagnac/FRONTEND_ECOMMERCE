<template>
  <div class="bloc-modale" v-if="reveleuh">
        <div v-on:click="openModale" class="overlay"></div>

      <div class="box mod boxensvp">
        <div class="btnmodal">
          <div class = "button buttonmodale" v-on:click="openModale">X</div>
        </div>
        <div class="ensvp">
          <div id="imgtuto">
            <img src="../assets/savon.png">
          </div>
          
             <strong id="textmdpoublie"> Savon de qualitéooooo </strong>
             
             <label id="renimdp"></label>
             <p id ="steptostep">Étapes à suivre</p>
             <div class="field borderensvp">
            
              <div id ="pad1">
                <label id="textetuto">
                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                 </label>
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