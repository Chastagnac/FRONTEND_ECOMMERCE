<template>
  <div class="bloc-modale" v-if="revele">
    <div v-on:click="toggleModale" class="overlay"></div>
      <div class="box mod">
        <div class="btnmodal">
          <div class = "button buttonmodale" v-on:click="toggleModale">X</div>
        </div>
        <div>
             <strong id="textmdpoublie"> Mot de passe oublié ? </strong>
             
             <label id="renimdp"></label>
             <p style="white-space: normal; width: 100%; margin: auto; font-size: 14px;">Veuillez saisir votre email de connexion afin de recevoir le lien de réinitialisation de votre mot de passe.     </p>
             <div class="field">
            <label id="mdpemail">E-mail de connexion</label>
            <div class="control">
              <input
                type="email"
                class="mailmdp input" 
                placeholder="Entrez votre adresse email"
                v-model="email"
                :disabled="disabled"
              >
            </div>
            <button class="button" id="btnmodale">Envoyer</button>
        </div>    
        </div>
       
        
      </div>
  </div>
</template>
<script>
export default {
  name: "Modale",
  props: ["revele", "toggleModale"],
};
</script>
<style scoped>
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