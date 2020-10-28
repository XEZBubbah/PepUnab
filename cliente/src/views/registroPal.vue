<template>
  <v-app>
      <div align="center">
          <h1>Bienvenido a Ordenar Palabra</h1>
      </div>
      <div id="login">
        <h1>Registro</h1>
        <br>
        <div>
            <input id= "user" type="text" name="username" v-model="input.username" placeholder="Username" />
            <hr>
        </div>
        <div>
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <hr>
        </div>
        <div>
            <b-button squared variant="primary" v-on:click="registro()">Registrarse</b-button>
        </div>
    </div>
  </v-app>
</template>
<script>
  import axios from 'axios';
  export default {
        name: 'Registro',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            async registro() {
                if(this.input.username != "" && this.input.password != ""){
                    const reb = await this.verRegistro();
                    console.log(reb.data);
                    if(reb.data == null){
                        console.log('good');
                        axios.post('http://localhost:3000/PepData/post/TextChallenge/'+this.input.username+'/'+this.input.password,{crossdomain: true}); 
                        alert("Registro exitoso, Se creó su usuario :)");
                        setTimeout(() =>{this.$router.push('/loginPal')},2000);
                    }else{
                        console.log('bad');
                        alert("El username ingresado ya está en uso :( , intenta con una diferente");
                    }
                }else{
                    alert("Se detectó un campo vacio, por favor llénalo")
                }
            },
            async verRegistro(){
                return await axios.get('http://localhost:3000/PepData/getUserVerification/TextChallenge/'+this.input.username,{crossdomain: true})
            }
        }
    }
</script>
<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 80px;
        padding: 20px;
    }
</style>