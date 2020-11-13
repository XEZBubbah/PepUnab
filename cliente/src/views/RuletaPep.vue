<template>
  <v-app id="body">
    <div class="botones">
        <b-button  type="button" variant="outline-warning"><router-link to='/login' style="color: #050505">Iniciar Sesión</router-link></b-button> |
        <b-button  type="button" variant="outline-info"><router-link to='/registro' style="color: #050505">Registrarse</router-link></b-button> |
        <b-button  type="button" variant="outline-success" @click="finishGame" style="color: #050505">Finalizar Juego</b-button>
    </div>
    <div align="center" style="font-family: Times New Roman">
      <h1>RULETA PEP</h1>
      <div id="mydiv">
        <div id="user">

        </div>
        <h1>
          <p>{{formattedElapsedTime}}</p>
        </h1>
      </div>
    </div>

    <div>
      <b-iconstack font-scale="5" animation="spin" style="margin-left:45%;">
        <b-icon visibility="hidden" id="caritafachera" stacked icon="emoji-sunglasses" variant="success" scale="5.0"
        animation="throb">
        </b-icon>
      </b-iconstack>
      <b-iconstack font-scale="5" animation="spin" style="margin-left:45%;">
        <b-icon visibility="hidden" id="caritasad" stacked icon="emoji-dizzy" variant="danger" scale="5.0"
        animation="throb">
        </b-icon>
      </b-iconstack>
    </div>

  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div id="preguntas" align="left"></div>
        <div id="respuestas" align="left" style="margin-top: 40px;"></div>
        <b-button disabled id="responder" type="button" variant="danger" style="margin-top: 30px; margin-left: -300px" 
        v-on:click="comprobar">Responder</b-button>
      </div>

      <div class="col-sm" style="margin-top: 6%; margin-left: -30px;">
        <div class="wheel-wrapper">
        <div class="wheel-pointer" @click="onClickRotate">
          Start
        </div>

        <div class="wheel-bg" :class="{freeze: freeze}" :style="`transform: rotate(${wheelDeg}deg)`">
          <div class="prize-list">
            <div class="prize-item-wrapper" v-for="(item,index) in prizeList" :key="index">
              <div class="prize-item" :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`">
                <div class="prize-name">
                  {{ item.numero }}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h2 style="margin-top: 30%;text-align: center;">Scores</h2>
    <b-table style="text-align: center;" striped hover :items="tabla"></b-table>
  </div>
  <div>
    <hr>
    <h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>
  </div>
  </v-app>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';
  import axios from 'axios';

  const $ = require('jquery')
  // Lo declaramos globalmente
  window.$ = $
  var result = " "

  var preguntas = [
    "¿Para que año se tiene pensado cumplir el objetivo retador del programa de ingeniería de sistemas?",
    "¿Para que año se tiene pensado cumplir el Objetivo Retador Facultad de Ingeniería?",
    "¿Competencia fundamental de un ingeniero de sistemas UNAB?",
    "¿Cual es una rama de trabajo de la ingeniería de sistemas?",
    "¿Cuál es el propósito central de la ingeniería de sistemas?",
    "¿Cuál de las siguientes no es una tendencia de la ingeniería de sistemas?",
    "El programa de Ingeniería de Sistemas de la UNAB considera fundamental una formación interdisciplinaria desde una visión sistémica",
    "En la línea de investigación qué competencias fundamentales se desarrollan"
  ]
  var respuestas = [
    ["2024","2023","2025"],
    ["2022","2023","2024"],
    ["Capacidad de insertar su labor en el contexto próximo y en el contexto amplio de la sociedad de manera ética.",
    "Capacidad de insertar su labor en el contexto próximo.","Capacidad de insertar su labor de manera ética."],
    ["Economía.","Electrónica.","Inteligencia Artificial."],
    ["Formamos ingenieros de sistemas innovadores con pensamiento disruptivo que promueven la transformación digital en un mundo en constante evolución.",
     "Formamos personas innovadoras que promueven la transformación digital en un mundo en constante evolución.",
     "Formamos ingenieros de sistemas innovadores con que promueven la transformación digital en un mundo en constante evolución."
    ],
    ["Eficiencia energetica","Realidad virtual","Ciencia de datos","Programación de microcontroladores"],
    ["Sí","No","No sé, todo es relativo","Todas"],
    ["Diseñar,modelar,evaluar,adaptar","Diseñar,modelar,alinear,adaptar","Modelar,Diseñar,Programar,Desplegar","Ninguna"]
  ]
  var resp_correctas = [
    '2024',
    '2024',
    'Capacidad de insertar su labor en el contexto próximo y en el contexto amplio de la sociedad de manera ética.',
    'Inteligencia Artificial.',
    'Formamos ingenieros de sistemas innovadores con pensamiento disruptivo que promueven la transformación digital en un mundo en constante evolución.',
    "Programación de microcontroladores",
    "Sí",
    "Diseñar,modelar,evaluar,adaptar"
  ]
  var guardarResp = []

  export default {

      data() {
        return {
          tabla: [],
          elapsedTime: 0,
          timer: undefined,
          tiempodeJuego: 0, //En segundos
          respuestasAcertadas: 0,
          tiempodb: 0,
          aciertosdb: 0,
          validar: true,
          freeze: false,
          rolling: false,
          wheelDeg: 0,
          prizeNumber: 8,
          prizeListOrigin: [
            {
              name: "¿Para que año se tiene pensado cumplir el objetivo retador del programa de ingeniería de sistemas?",
              numero: "Pregunta 1"
            },
            {
              name: "¿Para que año se tiene pensado cumplir el Objetivo Retador Facultad de Ingeniería?",
              numero: "Pregunta 2"
            },
            {
              name: "¿Competencia fundamental de un ingeniero de sistemas UNAB?",
              numero: "Pregunta 3"
            },
            {
              name: "¿Cual es una rama de trabajo de la ingeniería de sistemas?",
              numero: "Pregunta 4"
            },
            {
              name: "¿Cuál es el propósito central de la ingeniería de sistemas?",
              numero: "Pregunta 5"
            },
            {
              name: "¿Cuál de las siguientes no es una tendencia de la ingeniería de sistemas?",
              numero: "Pregunta 6"
            },
            {
              name: "El programa de Ingeniería de Sistemas de la UNAB considera fundamental una formación interdisciplinaria desde una visión sistémica",
              numero: "Pregunta 7"
            },
            {
              name: "En la línea de investigación qué competencias fundamentales se desarrollan",
              numero: "Pregunta 8"
            },
          ]
        };
      },
      mounted(){
        let vue = this;
        var tabla = [];
        axios.get('https://pepunab.herokuapp.com/PepData/getAll/RuletaChallenge',{crossdomain: true})
        .then(function(response){
          vue.posts = (response.data);
          //console.log(vue.posts)
          for (var f in vue.posts) {
            tabla[f] = {
            Nombre : String(vue.posts[f].username),
            Tiempo : String(vue.posts[f].tiempo),
            Puntaje : String(vue.posts[f].puntuacion),
            Categoria : String(vue.posts[f].categoria)}
          }
          vue.tabla = (tabla);
        });
      },
      computed: {
        prizeList() {
          return this.prizeListOrigin.slice(0, this.prizeNumber);
        },
        formattedElapsedTime() {
          const date = new Date(null);
          date.setSeconds(this.elapsedTime / 1000);
          const utc = date.toUTCString();
          return utc.substr(utc.indexOf(":") - 2, 8);
        },
      },
      methods: {
        async actEsta(){
          const respuesta = await this.compActEsta();
          //console.log("\n++++++\n")
          //console.log(respuesta.data);
          this.tiempodb = (respuesta.data[0]);
          this.aciertosdb = (respuesta.data[1]);
          this.actualizarRanking(this.pickCategoria(this.tiempodeJuego,this.respuestasAcertadas));
        },

        async compActEsta(){
          return await axios.get('https://pepunab.herokuapp.com/PepData/getUserEstadisticas/RuletaChallenge/'+
          this.$sesionRuleta+'/'+this.$passRuleta,{crossdomain: true})
        },

        mostrarUser(){
          document.getElementById("user").innerHTML = '<div><p>Usuario: '+this.$sesionRuleta+'</p><p>Tiempo: '
          +this.tiempodeJuego+' Segundos</p><p>Respuestas Acertadas: '+this.respuestasAcertadas+'</p></div>';
        },

        actualizarRanking(categoria) {
          axios.put('https://pepunab.herokuapp.com/PepData/put/RuletaChallenge/'+this.$sesionRuleta+'/'+this.$passRuleta+'/'+
          this.tiempodeJuego+'/'+this.respuestasAcertadas+'/'+categoria,{crossdomain: true})
          .then(function(response){
            console.log(response.data);
          });
        },

        pickCategoria(tiempo,puntuacion){
          var categorias = ['Noob','Principiante','Sargento','Veterano'];
          if(tiempo > 300){
            return categorias[0];
          }else if(puntuacion == 5 && tiempo < 60){
            return categorias[3];
          }else if(puntuacion == 4 && tiempo < 90){
            return categorias[2];
          }else if(puntuacion == 3 && tiempo < 120){
            return categorias[1];
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
        comprobar(){
          var respu = $("input[name='selector']:checked").val();
          this.validar = true; //Permitir que gire de nuevo
          if(resp_correctas.includes(respu)){
            document.getElementById("caritafachera").style.visibility = "visible";
            this.tiempodeJuego = this.tiempodeJuego + (this.elapsedTime)/1000;
            alert("Sí!!, Esta es la respuesta correcta uwu: "+" \nTiempo acumulado: "+this.tiempodeJuego+" segundos");
            this.respuestasAcertadas = this.respuestasAcertadas + 1;
            setTimeout(() =>{document.getElementById("caritafachera").style.visibility = "hidden";},3500);
            this.onClickRotate();
          }
          else{
            document.getElementById("caritasad").style.visibility = "visible";
            this.tiempodeJuego = this.tiempodeJuego + (this.elapsedTime)/1000;
            alert("No!!, Respuesta incorrecta :/"+" \nTiempo acumulado: "+this.tiempodeJuego+" segundos");
            setTimeout(() =>{document.getElementById("caritasad").style.visibility = "hidden";},3500);
            this.onClickRotate();
          }
        },
        menu(result){
          var txt_respuestas = " ";
          var r_pos = respuestas[result];
          var i = " ";
          var preg = preguntas[result];
          for (i in r_pos) {
            txt_respuestas += '<input type="radio" name="selector" value="'+r_pos[i]+'"><label>'+r_pos[i]+'</label><br>';
          }
          setTimeout(() => {
            document.getElementById("respuestas").innerHTML = txt_respuestas;
            document.getElementById("preguntas").innerHTML = preg;
          },4500)
        },
        onClickRotate() {
          if(this.$sesionRuleta == undefined && this.$passRuleta == undefined)
          {
            alert("Por favor, inicia Sesión o registrate para jugar !! ^-^");
          }else{
            this.stop();
            this.mostrarUser();
            if (this.rolling && this.validar==false) {
              return;
            }else{
              result = Math.floor(Math.random() * this.prizeList.length);
              this.roll(result);
            }
          }
        },
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
        roll(result) {
          this.reset();
          if(guardarResp.length<5){
            this.rolling = true;
            const { wheelDeg, prizeList } = this;
            this.wheelDeg = wheelDeg - wheelDeg % 360 + 6 * 360 + (360 - 360 / prizeList.length * result);

            setTimeout(() => {
              this.rolling = false;
              if(guardarResp.length>0 && guardarResp.includes(prizeList[result].name)){
                alert("UPS ya has seleccionado está pregunta, Vamos a por otra!!!");
                document.getElementById("responder").disabled = true;
                this.onClickRotate();
              }else{
                guardarResp.push(prizeList[result].name);
                alert("Pregunta：" + prizeList[result].name+ " \n\nResponde tan rápido como puedas!!");
                document.getElementById("responder").disabled = false;
                this.start();
              }
            },4500);
            this.menu(result);
            this.validar = false; //Impedir que gire mientras responde las preguntas
          }else{
            this.actEsta();
            alert("Felicidades Has llenado todas las palabras!! \n❆ Tiempo gastado: "+
              this.tiempodeJuego+' segundos'+"\n❆ Respuestas acertadas: "+this.respuestasAcertadas
              +'\n\nEl ranking se actualizará en breve ..... loading');
            setTimeout(() =>{
              this.$router.go();
            },5000)
          }
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
        }

      },
      watch: {
        prizeNumber() {
          this.freeze = true;
          this.wheelDeg = 0;

          setTimeout(() => {
            this.freeze = false;
          }, 0);
        },
      }
    };
</script>

<style>

  .botones{
    margin:auto;
    text-align: center;
    width:48%;
  }
  #body{
    background-color:#F5F7FF;
  }

  #caritafachera{
    position: absolute;
    text-align: center;
    top: 900%;
    left: 600px;
  }

  .wheel-wrapper {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 55%;
    left: 70%;
    transform: translate(-50%, -50%);
  }

  .wheel-pointer {
    width: 60px;
    height: 60px;
    border-radius: 1000px;
    background: yellow;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 60px;
    z-index: 10;
    cursor: pointer;
  }
  .wheel-pointer::after {
    content: "";
    position: absolute;
    top: -32px;
    left: 50%;
    border-width: 0 8px 40px;
    border-style: solid;
    border-color: transparent transparent yellow;
    transform: translateX(-50%);
  }

  .wheel-bg {
    width: 100%;
    height: 100%;
    border-radius: 1000px;
    overflow: hidden;
    transition: transform 4s ease-in-out;
    background: #7eef97;
  }
  .freeze {
      transition: none;
      background: red;
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
  }

  .prize-item-wrapper {
    position: absolute;
    bottom: 350px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
  }

  .prize-item {
    width: 100%;
    height: 130%;
    transform-origin: bottom;
  }
  .prize-name {
      padding: 0px 0;
  }
</style>
