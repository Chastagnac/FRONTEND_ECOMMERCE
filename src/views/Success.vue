<template>
  <div>
    <div class="box" style="width: 50%; margin: auto">
      <article class="message is-success">
        <div class="message-header">
          <p>Félicitation !</p>
        </div>
        <div class="message-body">
          Votre achat à bien été prit en compte.
          <strong>Eco Service </strong>s'occupe de tout !
          <br />
          Vous allez être redirigé ...
          <img src="../assets/logoblack.png" class="logo" alt="" />
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "Success",
  setup() {
    return {};
  },

  data() {
    return {};
  },
  mounted() {
    document.title = "Eco-Service";

  },
};
</script>

<style scoped>
</style>