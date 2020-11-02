<template>
    <v-app>
        <h2 style="text-align: center;font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;">Escribe la palabra correctamente</h2>
        <hr>
        <div class="botones">
            <b-button  type="button" variant="outline-warning"><router-link to='/loginPal' style="color: #050505">Iniciar Sesión</router-link></b-button> |
            <b-button  type="button" variant="outline-info"><router-link to='/registroPal' style="color: #050505">Registrarse</router-link></b-button> |
            <b-button  type="button" variant="outline-success" @click="finishGame" style="color: #050505">Finalizar Juego</b-button>
        </div>
        <hr>
        <div class="botones">
            <button type="button" class="btn btn-dark" v-on:click="play(true)">Jugar</button>           
        </div>
        <hr>
        <div id="user" align="center" style="font-family: Times New Roman">

        </div>
        <hr>
        <h2>
        <div id="palabra" class="texto2" style="text-align: center;font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;">

        </div>
        </h2>
        <div id="respuesta" class="texto2">

        </div>
        <hr>
        <div class="botones">
            <button type="button" class="btn btn-dark" v-on:click="comprobar()">Verificar</button> 
        </div>
       <div class="texto">
            <br>
            <h1>
            <p>{{formattedElapsedTime}}</p>
            </h1>
        </div>
        <div>
            <h2 style="margin-top: 3%;text-align: center;">Scores</h2>
            <b-table style="text-align: center;" striped hover :items="tabla"></b-table>
        </div>
        <hr>
        <h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>
    </v-app>  

</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import axios from 'axios';
    const $ = require('jquery')
  // Lo declaramos globalmente
    window.$ = $

    var WORDS     = ["inteligencia artificial", "ciencia de datos", "sistema", "algoritmo","computacion","codificar","procesos","datos","programar","enigma"];
    var SCRAMBLED = ["ineltienicga rtailicfia", "acinice ed tasod", "emtissa", "tglaroiom","mptaoocnuci","dificacor","ropsceos","atdso","rpormarga","gnmeia"];
    var randomNumber = 0;
    var ingresePal = " ";
    var a = " ";


    export default {

        data(){
            return {
                tabla: [],
                elapsedTime: 0,
                timer: undefined,
                tiempodeJuego: 0, //En segundos
                respuestasAcertadas: 0,
            }
        },
         mounted(){
            let vue = this;
            var tabla = [ ];
            axios.get('https://pepunab.herokuapp.com/PepData/getAll/TextChallenge',{ crossdomain: true })
            .then(function(response){
            vue.posts = (response.data)
            console.log(vue.posts)
            for (var f in vue.posts) {
                tabla[f] = {Nombre : String(vue.posts[f].username), Tiempo : String(vue.posts[f].tiempo), Puntaje : String(vue.posts[f].puntuacion), Categoria : String(vue.posts[f].categoria)}
            }
                vue.tabla = (tabla)
            })
        },
        computed:{
            formattedElapsedTime() {
                const date = new Date(null);
                date.setSeconds(this.elapsedTime / 1000);
                const utc = date.toUTCString();
                return utc.substr(utc.indexOf(":") - 2, 8);
            }
        },

        methods:{
            finishGame(){
                this.actEsta();
                alert(
                "El juego ha finalizado \n❆ Tiempo gastado: "+this.tiempodeJuego+' segundos'+
                "\n❆ Respuestas acertadas: "+this.respuestasAcertadas+
                '\n\nEl ranking se actualizará en breve ..... loading');
                setTimeout(() =>{
                    this.$router.go();
                },5000) 
            },
            start() {
                this.timer = setInterval(() => {
                this.elapsedTime += 1000;
                }, 1000);
            },
            stop() {
                clearInterval(this.timer);
            },
            reset() {
                this.elapsedTime = 0;
            },
            async actEsta(){
                const respuesta = await this.compActEsta();
                console.log("\n++++++\n")
                console.log(respuesta.data); 
                this.tiempodb = (respuesta.data[0]);
                this.aciertosdb = (respuesta.data[1]);
                if(this.aciertos >= this.respuestasAcertadas){
                    console.log("Sigue intentando");
                }else{
                    this.actualizarRanking(this.pickCategoria(this.tiempodeJuego,this.respuestasAcertadas));
                }
            },
            async compActEsta(){
                return await axios.get('https://pepunab.herokuapp.com/PepData/getUserEstadisticas/TextChallenge/'+
                this.$sesionRuleta+'/'+this.$passRuleta,{crossdomain: true})
            },
            actualizarRanking(categoria){
                axios.put('https://pepunab.herokuapp.com/PepData/put/TextChallenge/'+this.$sesionRuleta+'/'+this.$passRuleta+'/'+
                this.tiempodeJuego+'/'+this.respuestasAcertadas+'/'+categoria,{crossdomain: true})
                .then(function(response){
                    console.log(response.data);
                });
            },
            pickCategoria(tiempo,puntuacion){
                var categorias = ['Noob','Recluta','Profesional','Killer'];
                if(tiempo > 300){
                    return categorias[0];
                }else if(puntuacion > 10 && tiempo < 60){
                    return categorias[3];
                }else if(puntuacion == 10 && tiempo < 60){
                    return categorias[3];
                }else if(puntuacion == 9 && tiempo < 90){
                    return categorias[3];
                }else if(puntuacion == 8 && tiempo < 90){
                    return categorias[2];
                }else if(puntuacion == 7 && tiempo < 90){
                    return categorias[2];
                }else if(puntuacion == 6 && tiempo < 90){
                    return categorias[2];
                }else if(puntuacion == 5 && tiempo < 120){
                    return categorias[1];
                }else if(puntuacion == 4 && tiempo < 120){
                    return categorias[1];
                }else if(puntuacion == 3 && tiempo < 150){
                    return categorias[0];
                }else if(puntuacion == 2 && tiempo < 150){
                    return categorias[0];
                }else if(puntuacion == 1 && tiempo < 180){
                    return categorias[0];
                }else if(puntuacion == 0){
                    return categorias[0];
                }else{
                    return categorias[1];
                }
            },
            play(playing){

                if(playing == true){
                    randomNumber = Math.floor(Math.random() * WORDS.length);
                    var randomWord = SCRAMBLED[randomNumber];
                    var userInput = randomWord;
                    this.mostrarUser();
                    this.start();
                    ingresePal = '<textarea name="textarea" rows="10" cols="40">  </textarea>'
                    
                    setTimeout(() => {
                        document.getElementById("palabra").innerHTML = userInput;
                        document.getElementById("respuesta").innerHTML = ingresePal;
                    },1000)
                    console.log(userInput);
                    }else{
                    alert("Juego finalizado ...")
                    this.reset();
                    this.stop();
                }
            },
             mostrarUser(){
                document.getElementById("user").innerHTML = '<div><p>Usuario: '+this.$sesionRuleta+'</p><p>Tiempo: '
                +this.tiempodeJuego+' Segundos</p><p>Respuestas Acertadas: '+this.respuestasAcertadas+'</p></div>';
             },
            comprobar(){                
                this.stop();
                this.tiempodeJuego = (this.elapsedTime)/1000;

                    var val = $.trim($("textarea").val());
                    console.log(val);
                    if (val != "") {
                        if (val == WORDS[randomNumber]) {
                            this.respuestasAcertadas = (this.respuestasAcertadas) + 1;
                            console.log(this.respuestasAcertadas)
                            alert("Bien pusiste la palabra correcta => "+ a);
                            this.play(true);
                        }
                        else  {
                            alert("Palabra incorrecta =( sigue intentando ... ");
                            this.start();                
                        }
                    }
                console.log(WORDS[randomNumber])
                console.log(this.tiempodeJuego);
            }

        }
    }

</script>


<style>

.botones{
  margin:auto;
  text-align: center;
  width:48%;
}
#respuesta{
    border: 5px solid grey;
    border-radius: 1px;
}
.texto{
    margin:auto;
    text-align: justify;
    width:48%;
}
.texto2{
    margin:auto;
    text-align: center;
    width:48%;
}

</style>