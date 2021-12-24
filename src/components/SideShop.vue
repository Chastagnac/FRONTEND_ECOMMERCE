<template>
  <div class="column is-3">
    <aside class="menu is-hidden-mobile">
      <p class="menu-label">Catégories</p>
      <ul class="menu-list">
        <li>
          <router-link to="/shop">Tout</router-link>
        </li>
        <li>
          <router-link to="/shop/alimentation">Alimentations</router-link>
        </li>
        <li>
          <router-link to="/shop/electronique">Electronique</router-link>
        </li>
        <li>
          <router-link to="/shop/maison">Maison</router-link>
        </li>
        <li>
          <router-link to="/shop/jouets">Jouets</router-link>
        </li>
        <li>
          <router-link to="/shop/textile">Textile</router-link>
        </li>
      </ul>
      <p class="menu-label">Prix maximum</p>

      <input
        type="range"
        class="form-control-range"
        id="formControlRange"
        min="10"
        max="4000"
        v-model="price"
      />
      <input
        class="slider input"
        type="text"
        v-model="price"
        style="width: 65px; height: 23px; border-radius: 2px; margin-left: 5px"
      />
      €
    </aside>
  </div>
</template>

<script>
export default {
  name: "SideShop",
  data() {
    return {
      price: 4000,
    };
  },

  mounted() {},
  methods: {},
};
</script>