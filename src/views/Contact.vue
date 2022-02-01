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
          <label class="label" id="pn">Nom</label>
          <div class="control">
            <input
              class="input"
              id="np"
              type="text"
              placeholder="Entrez votre nom"
            />
          </div>
        </div>
       
        <div class="field">
          <label class="label" id="yourmail">Adresse email</label>
          <div class="control">
            <input
              class="input"
              id="limae"
              type="email"
              placeholder="Exemple@gmail.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" id="yourmail">Objet</label>
          <div class="control">
            <input
              class="input"
              id="limae"
              type="email"
              placeholder="Définir l'objet"
            />
          </div>
        </div>
        
        <div class="field">
          <label class="label" id="yourmail">Message</label>
          <div class="control">
            <textarea
              class="textarea"
              id="msg"
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
        color: #gray;
        opacity: 1;
      }
</style>
