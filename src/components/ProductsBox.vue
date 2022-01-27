<template>
  <div>
    <div class="box" style="margin: 30px; height: 370px">
      <article class="media" style="background-color: black">
        <img :src="product.get_thumbnail" />
      </article>
      <div class="media-content">
        <div class="content">
          <p>
            {{ product.name }}
            <br />
          </p>
        </div>
      </div>

      <div class="container">
        {{ product.price }} €
        <router-link
          v-bind:to="product.get_absolute_url"
          class="button is-dark mt-4"
          >Voir détails</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsBox",
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.image {
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.column.is-narrow {
  width: 15%;
}
.box {
  border-style: groove;
  border-color: #49ae253b;
}
</style>