<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">S'incrire</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Nom d'utilisateur</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>E-mail</label>
                        <div class="control">
                            <input type="email" class="input" v-model="email">
                        </div>
                    </div>
                    <div class="field">
                        <label>Mot de passe</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>
                    <div class="field">
                        <label>Répéter mot de passe</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password2">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">S'inscrire</button>
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <hr>
                    Ou <router-link to="/log-in">Cliquez ici</router-link> pour se connecter !
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    methods : {
        submitForm() {
            this.errors = []

            if(this.username === '') {
                this.errors.push(`Le nom d'utilisateur doit être renseigné`)
            }

            if(this.email === '') {
                this.errors.push(`Le mail doit être rempli`)
            }

            if(this.password === '') {
                this.errors.push(`Le mot de passe doit être renseigné`)
            }

            if(this.password2 !== this.password) {
                this.errors.push(`Les mots de passe doivent être identiques`)
            }

            if(!this.errors.lenght) {
                const formData = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }

                axios
                .post("/api/v1/users/", formData)
                .then(response => {
                    toast({
                        message: 'Compte créé, veuillez vous connecter !',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration:2000,
                        position: 'bottom-right'
                    })
                    this.$router.push('/log-in')
                })
                .catch(error => {
                    if(error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}:${error.response.data[property]}`)
                        }

                        console.log(JSON.stringify(error.response.data))
                    } else if(error.message) {
                        this.errors.push('Something went wrong. Please try again')

                        console.log(JSON.stringify(error))
                    }
                })
            }
        }
    }
}
</script>