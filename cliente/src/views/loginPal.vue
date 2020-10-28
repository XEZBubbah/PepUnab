<template>
  <v-app>
      <div align="center">
          <h1>Bienvenido a Ordena la Palabra</h1>
      </div>
        <div id="login">
            <h1>Login</h1>
            <br>
            <div>
                <input type="text" name="username" v-model="input.username" placeholder="Username" />
                <hr>
            </div>
            <div>
                <input type="password" name="password" v-model="input.password" placeholder="Password" />
                <hr>
            </div>
            <div>
                <b-button squared variant="primary" v-on:click="login()">Login</b-button>
            </div>
        </div>
  </v-app>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';

    export default {
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
            }
        },
        methods: {
            async establecerSesion() {
                var usuario = this.input.username;
                var codigo = this.input.password;
                if(usuario != "" && codigo != ""){                 
                    return await axios.get('http://localhost:3000/PepData/getValidation/TextChallenge/'
                    +usuario+'/'+codigo,{crossdomain:true})
                }else{
                    alert("Se detecto un campo vacio, por favor llenalo")
                }
            },

            async login(){
                try {
                    const response = await this.establecerSesion();
                    /*console.log(response.data[0]['username']);
                    console.log(response.data[0]['password']);*/

                    Vue.prototype.$sesion = response.data[0]['username'];
                    Vue.prototype.$pass = response.data[0]['password'];
                    
                    console.log('good');
                    alert("Has iniciado sesión :) \nPreparate para jugar!!!!");
                    setTimeout(() =>{this.$router.push('/Palabra')},2000);
                } catch (error) {
                    alert("Usuario o contraseña incorrectos");
                    console.log("Se produjo un error al establecer sesión");
                }
            }
        }
    }
</script>

<style>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 80px;
        padding: 20px;
    }
</style>