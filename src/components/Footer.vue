<template>
  <div class="footer">
        <img style="height: 150px" :src="require(`@/assets/logowhite.png`)" />
    <div class="contenue">
    
      <div class="col">
        <h1>Eco Service</h1>
        <ul>
         <router-link to="/contact"><li> Contact</li></router-link>
          <router-link to="/conditions-generales"><li> Conditions générales</li></router-link>
          <router-link to="/service"><li> Services</li></router-link>
          <router-link to="/shop"><li> Produits</li></router-link>
        </ul>
      </div>

      <div class="col">
        <h1>Réseaux</h1>
        <ul>
          <li><a href="https://www.instagram.com/eco_service13/"><i class="fab fa-instagram fa-2x white"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  height: 450px;
}
</style>