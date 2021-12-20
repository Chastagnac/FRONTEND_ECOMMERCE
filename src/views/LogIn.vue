<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Se connecter</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Nom d'utilisateur</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>Mot de passe</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Connection</button>
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <hr>
                    Ou <router-link to="/sign-up">Cliquez ici</router-link> pour s'inscrire !
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'Log-in',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Connection |`Ilios Shop '
    }, 
    methods : {

        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")

            const fromData = {
                username: this.username,
                password: this.password
            }
            
            await axios
            .post("/api/v1/token/login/", fromData)
            .then(response => {
                const token = response.data.auth_token
                this.$store.commit('setToken', token)
                this.$store.commit('addAccount', fromData)
                axios.defaults.headers.common["Authorization"] = "Token " + token

                localStorage.setItem("token", token)

                const toPath = this.$route.query.to || '/cart'
                this.$router.push(toPath)
            })
            .catch(error => {
                if(error.response) {
                    for(const property in error.response.data) {
                        this.errors.push(`${property}: ${error.response.data[property]}`)
                    }
                } else {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(JSON.stringify(error))
                }
            })
        }
    }
}
</script>