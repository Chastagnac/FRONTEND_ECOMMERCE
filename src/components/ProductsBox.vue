<template>
  <div>
    <div class="box" style="margin: 10px; height: 460px">
      <article class="media">
        <div class="media-left">
          <figure class="image mb-4 is-128x128">
            <img :src="product.get_thumbnail" />
          </figure>
        </div>
      </article>
      <div class="media-content">
        <div class="content">
          <p>
            {{ product.name }}
            <br />
          </p>
        </div>
        <router-link
          v-bind:to="product.get_absolute_url"
          class="button is-dark mt-4"
          >Voir détails</router-link
        >
        <div>{{ product.price }} €</div>
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
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}

.column.is-narrow {
  width: 15%;
}
.box {
  border-style: groove;
  border-color: #49ae253b;
}
</style>