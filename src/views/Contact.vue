<template>
  <div class="Contact">
   <div class="container is-max-desktop">
      <div>
        <h1 id="mytitlee">Contactez nous !</h1>
      </div>
      <h2>
        <a
          class="tab-link active"
          data-ref="connexion"
          href="javascript:void(0)"
          ><router-link id="connexionsign" to="/contact"
            >Contact
          </router-link></a
        >
        <a
          class="tab-link active"
          data-ref="inscription"
          href="javascript:void(0)"
          ><router-link id="inscriptionsign" to="shop"
            >F.A.Q
          </router-link></a
        >
      </h2>
      <div
        class="column is-12 is-11-desktop mx-auto has-text-centered"
       
      >
        <div class="field">
          <label class="label" id="pnc">Nom</label>
          <div class="control">
            <input
              class="input"
              id="limaec"
              type="text"
              placeholder="Entrez votre nom"
            />
          </div>
        </div>
       
        <div class="field">
          <label class="label" id="yourmailc">Adresse email</label>
          <div class="control">
            <input
              class="input"
              id="limaec"
              type="email"
              placeholder="Exemple@gmail.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" id="objetc">Objet</label>
          <div class="control">
            <input
              class="input"
              id="limaec"
              type="email"
              placeholder="Définir l'objet"
            />
          </div>
        </div>
        
        <div class="field">
          <label class="label" id="messagec">Message</label>
          <div class="control">
            <textarea
              class="textarea"
              id="msgc"
              placeholder="Décrivez nous votre besoin..."
              
            ></textarea>
          </div>
        </div>

        <button class="button2">
          Envoyer
        </button>
      </div>
   </div>  
   

  </div>
</template>
<script>
export default {
  name: "Contact",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#msg::placeholder {
        color: gray;
        opacity: 1;
      }
<<<<<<< HEAD
=======

>>>>>>> 6cc418eaab3cff254fd414fda01b59fc1d69f155
 #limaec {
  width: 56% !important;
  border-color: #418014;
}   
#msgc {
  display: block;
  max-width: 79%;
  min-width: 56%;
  padding: calc(0.75em - 1px);
  resize: vertical;
  left: 22%;
  border-color: #418014;
}  
#pnc {
  text-align: center;
  margin-left: 0%;
  margin-right: 50%;
}
#yourmailc {
  text-align: center;
  margin-right: 42%;
}
#objetc{
  text-align: center;
  margin-right: 50%;
}
#messagec{
  text-align: center;
  margin-right: 47%;
}
<<<<<<< HEAD
=======

>>>>>>> 6cc418eaab3cff254fd414fda01b59fc1d69f155
@media only screen and (max-width: 793px) {
  #messagec {
  text-align: center;
  margin-right: 0%;
}
#pnc {
  text-align: center;
  margin-left: 0%;
  margin-right: 0%;
}
#yourmailc {
  text-align: center;
  margin-right: 0%;
}
#objetc{
  text-align: center;
  margin-right: 0%;
}
<<<<<<< HEAD
}
</style>
=======


}
</style>

>>>>>>> 6cc418eaab3cff254fd414fda01b59fc1d69f155
