<template>
    <div class="column is-narrow">
        <div class="box">
            <figure class="image mb-4 is-128x128">
                <img :src="product.get_thumbnail" />
            </figure>
            <h3 class="is-size-5">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey">${{ product.price }}</p>
            <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">Voir détails</router-link>
        </div>
    </div>
</template>

<script>

export default ({
    name: 'ProductsBox',
    props: {
        product : Object
    }
})
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
    height: 300px;
}
</style>