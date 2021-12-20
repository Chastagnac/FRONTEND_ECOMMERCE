<template>
    <transition-group name="bounce" appear>
        <div v-if="visible">
            <div class="columns m-2">
                
                <div class="box">
                    <button class="delete is-medium" @click="removeProduct(product)"></button>
                    <figure class="image is-128x128">
                        <img :src="product.get_thumbnail" />
                    </figure><br>
                    <h4 class="mb-6">{{ product.name }}</h4>
                    <router-link v-bind:to="product.get_absolute_url" 
                    class="button is-info is-warning">Détails</router-link>
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script>
export default {
  name: "ProductsCountry",
  emits: ["removeProduct"],
  props: {
    product: Object,
  },
  data() {
      return {
          visible : true
      }
  },
  methods: {
    removeProduct(product) {
        this.visible = false
        setTimeout(() => {
            this.$emit('removeProduct', product)
        }, 1000);
    }
  }
};

</script>

<style scoped>

    .image {
        margin-top: -1.25rem;
        margin-left: -1.25rem;
        margin-right: -1.25rem;
    }
    button {
        z-index: 2;
    }

    .bounce-leave-active {
        animation: bounce-in 1s;
    }

    @keyframes bounce-in {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(0);
    }
}
</style>
