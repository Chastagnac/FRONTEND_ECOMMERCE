<template>
    <div class="page-log-in">
        <div class="columns">
            <div v-if="isconnection" class="column is-4 is-offset-4">
               <h2>
                    <a class="tab-link active"  data-ref="connexion"  href="javascript:void(0)"><router-link id="abcde" to="/log-in">Connexion </router-link></a>
                      <a class="tab-link active"  data-ref="inscription" href="javascript:void(0)"><router-link id="inscription" to="sign-up">Inscription </router-link></a>
                </h2>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Nom d'utilisateur</label>
                        <div class="control">
                            <input type="text"  id="holderi" placeholder="Nom d'utilisateur" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>Mot de passe</label>
                        <div class="control">
                            <input type="password"  id="holderi" placeholder="Mot de Passe" class="input"  v-model="password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Connexion</button>
                        </div>
                    </div>
                    
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
            errors: [],
            isconnection: true
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


<style lang="scss">

.page-log-in{
   
 
  padding: 0;
  background-image: url("../assets/environnement-urbain.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  height: 44em;
}




</style>