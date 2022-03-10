<template>
  <div class="service">
    <ServiceDesign></ServiceDesign>
    <div class="container is-max-desktop">
      <div class="column is-12 is-6-desktop mx-auto has-text-centered">
        <h2 class="mb-4 is-size-1 is-size-2-mobile has-text-weight-bold">
          Je fais mon devis !
        </h2>
      </div>

      <section id ="verde" class="section has-background-primary">
        <div class="container" style="margin: 24px">
          <div class="is-vcentered columns is-multiline">
            <div class="column is-6 is-5-desktop mb-4">
              <h2
                class="
                  has-text-white
                  mt-2
                  mb-3
                  is-size-1 is-size-3-mobile
                  has-text-weight-bold
                "
              >
                Faire un devis
              </h2>
              <p class="has-text-white">
                Professionnel ou particulier ? Pas de soucis !
              </p>
            </div>
            <div class="column is-5 ml-auto">
              <div
                class="mx-auto box p-6 has-background-light has-text-centered"
              >
                <p class="has-text-grey-dark mb-2">
                  <img
                    src="../assets/devisgratuit.png"
                    style="height: 100px"
                    alt=""
                  />
                </p>
                <br />
                <div class="card">
                  <router-link class="is-primary" to="/service/devis"
                    >Commencer le devis</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ServiceDesign from "@/components/service/ServiceDesign";
export default {
  name: "Service",
  data() {
    return {
      data: {},
    };
  },
  components: { ServiceDesign },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.has-background-primary {
  background-color: #418014 !important;
}
#verde{
  border-radius: 30px;
}
</style>
