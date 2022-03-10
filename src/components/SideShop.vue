<template>
  <div class="column is-3">
    <aside class="menu is-hidden-mobile mt">
      <p class="menu-label">Catégories</p>
      <ul class="menu-list">
        <li>
          <router-link to="/shop">Tout</router-link>
        </li>
        <li>
          <router-link to="/shop/alimentation">Alimentation</router-link>
        </li>
        <li>
          <router-link to="/shop/electronique">Electronique</router-link>
        </li>
        <li>
          <router-link to="/shop/maison">Maison</router-link>
        </li>
        <li>
          <router-link to="/shop/jouets">Jouet</router-link>
        </li>
        <li>
          <router-link to="/shop/textile">Textile</router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "SideShop",

 data() {
    return {
      products: [],
    };
  },

  props: {
    price : 0,
  },

  mounted() {},
  methods: {
    changePrice()
    {
      this.$emit('changePrice',this.price)
    },
  }
} 
</script>
<style scoped>
.mt {
    margin-top: 60px;
}
</style>