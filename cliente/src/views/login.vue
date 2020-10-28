<template>
  <v-app>
      <div align="center">
          <h1>Bienvenido a RuletaPEP</h1>
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

        <div class="container" style="margin-top:80px">
            <h2>Reglas básicas del juego</h2>
            <div class="row">
                <div class="col-sm">
                    <ul style="margin-top:30px">
                        <li>Debes tener un usuario para jugar</li>
                        <li>Si le das al botón de finalizar juego, se guardará tu puntaje actual</li>
                        <li>Son solo 5 preguntas, la ruleta elige al azar una</li>
                        <li>Se acaba el juego al presionar el botón finalizar o responder las 5 preguntas</li>
                        <li>La puntuación corresponde al número de preguntas acertadas</li>
                        <li>Existen 4 categorias</li>
                            <ul>
                                <li>Noob</li>
                                <li>Principiante,</li>
                                <li>Sargento</li>
                                <li>Veterano</li>
                            </ul>
                    </ul>
                </div>
                <div class="col-sm" style="margin-top:30px">
                    <ul>
                        <li>Las categorias son elegidas del siguiente modo:</li>
                        <ul>
                            <li>Si tu tiempo es mayor a 300 segundos, obtienes "Noob"</li>
                            <li>Si tu tiempo es menor a 60 segundos con una puntuacion de 5, obtienes "Killer"</li>
                            <li>Si tu tiempo es menor a 90 segundos con una puntuacion de 4, obtienes "Profesional"</li>
                            <li>Si tu tiempo es menor a 120 segundos con una puntuacion de 3, obtienes "Recluta"</li>
                            <li>Si tu tiempo es menor a 150 segundos con una puntuacion de 2, obtienes "Noob"</li>
                            <li>Si tu tiempo es menor a 180 segundos con una puntuacion de 1, obtienes "Noob"</li>
                            <li>Si tu puntuacion es de 0, obtienes "Noob"</li>
                            <li>Si no cumples con las anteriores criterios, obtienes "Recluta"</li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            
            
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
                    return await axios.get('http://localhost:3000/PepData/getValidation/RuletaChallenge/'
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

                    Vue.prototype.$sesionRuleta = response.data[0]['username'];
                    Vue.prototype.$passRuleta = response.data[0]['password'];
                    
                    console.log('good');
                    alert("Has iniciado sesión :) \nPreparate para jugar!!!!");
                    setTimeout(() =>{this.$router.push('/RuletaPep')},2000);
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