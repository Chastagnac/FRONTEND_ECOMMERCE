<template>
  <div class="footer">
    <div class="alignfooter">
      <div class="imgfoot">
        <img id ="logofooter" style="height: 70px" :src="require(`@/assets/logowhitefooter.png`)" />
      </div>
 

    <div class="contenue flexfooter">
      <div class="col">
        <h1 id="tittlefooter">Eco Service</h1>
        <ul>
          <router-link to="/"><li>Accueil</li></router-link>
          <router-link to="/shop"
            ><li>Produits</li></router-link
          >
          <router-link to="/service"><li>Services</li></router-link>
          <router-link to="/admin"><li>Admin</li></router-link>
        </ul>
      </div>

      <div class="col">
        <h1 id="tittlefooter">Réseaux</h1>
        <div class="myreseau">
          <ul>
            <li>
              <a href="https://www.instagram.com/eco_service13/"
                ><i class="fab fa-instagram fa-2x white"></i
              ></a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="https://www.facebook.com/EcoServices-102014302399347"
                ><i class="fab fa-facebook fa-2x white"></i
              ></a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="https://twitter.com/EcoService9"
                ><i class="fab fa-twitter fa-2x white"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col">
        <h1 id="tittlefooter">Aide & Contact</h1>
        <ul>
          <router-link to="/contact"><li>Contact</li></router-link>
          <router-link to="/conditions-generales"
            ><li>Conditions générales</li></router-link
          >
          <router-link to="/tutoriel"><li>Tutoriels</li></router-link>
          <router-link to="/contact"><li>F.A.Q</li></router-link>
        </ul>
      </div>
    </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isActive: false,
      isActiveuh: false,
    };
  },
};
</script>

<style scoped>
details[open] > div {
  animation: fade 0.3s ease-in-out;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.imgfoot{
  margin-top:3%;
}
.alignfooter{
  display: flex;
}
.myreseau{
  display: flex;
  flex-direction: row;
}
.footer[data-v-40ab164b] {
  height: max-content;
  z-index: -1;
  position: absolute;
}
.footer {
padding: 0.5rem 0.5em 0rem;
}
.footer .col {
  width: auto;
  height: auto;
  float: left;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 0px 20px 20px 20px;
  margin-left: 5%;
}

#tittlefooter {
  text-align: center;
  font-size: 21px;

  color: white;
}
.bloc {
  word-wrap: break-word;
}

.faqfoot {
  width: 50%;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
}
details[data-v-40ab164b] {
  background: #fefefe;
  border-radius: 7px;

  margin-top: 2%;

  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #ededed;
}

.reponsefoot {
  background: #f1f1f5;
}

#idrep {
  text-align: center;
  color: #333333;
  font-size: 13px;
  margin-left: 0%;
  padding: 10px;
  font-style: italic;
}
.flexfooter {
  display: flex;
  margin-left: 0%;
  justify-content: center;
  margin:auto;
  width: 100%;
}
svg:not(:root).svg-inline--fa {
  overflow: visible;
  margin-right: 30px;
  margin-left: 24%;
  color:#485fc7;
}
@media only screen and (max-width: 769px) {
  .flexfooter {
    display: flex;
    margin-left: 0%;
    flex-direction: column;
  }
  .faqfoot[data-v-40ab164b] {
    width: 100%;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 10px;
  }
  .footer .col {
    width: 42%;
    text-align: center;
    margin: auto;
  }
  .myreseau{
  display: flex;
  flex-direction: column;
}
svg:not(:root).svg-inline--fa[data-v-40ab164b] {
  overflow: visible;
  margin-right: 0px;
  margin-left: 0%;
  color: #485fc7;
}
#logofooter{
  margin: auto;
display: flex;
}
.alignfooter{
  display: flex;
  flex-direction: column;
}
}
</style>