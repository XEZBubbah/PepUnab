<template>
<v-app>

<div>
    <h2 style="margin-top: 3%;text-align: center;">Scores</h2>
    <b-table style="text-align: center;" striped hover :items="tabla"></b-table>
</div>

<div class=container>
<h1 id="output">¿Qué tan rápido puedes escribir?</h1>
<hr>
<div class="botones">
    <b-button  type="button" variant="outline-warning"><router-link to='/loginTS' style="color: #050505">Iniciar Sesión</router-link></b-button> |
    <b-button  type="button" variant="outline-info"><router-link to='/registroTS' style="color: #050505">Registrarse</router-link></b-button>
</div>
<hr>
<div class="reglas">
<ul class="stats">
  <li>-Inicia Sesión para poder registrar tu tiempo</li>
  <li>-Para iniciar dale al botón de "Empezar" y luego a la tecla espacio</li>
  <li>-Escribe el texto lo más rapido que puedas</li>
  <li>-No olvides darle a Finalizar para subir tus datos</li>
</ul>
</div>

<br>

<div class="target mono" id="target"></div>
<div id="your-attempt" class="mono your-attempt" placeholder="Your text will appear here"></div>
<div class="results">
  <ul class="stats">
    <li class="loler">Palabras por minuto <span id="wpm">0</span></li>
    <li class="loler">Contador de palabras<span id="wordcount">0</span></li>
    <li class="loler">Tiempo <span id="timer">0</span></li>
    <li class="loler">Errores <span id="errors">0</span></li>
  </ul>
</div>
<hr style="clear:both;" />
<div>
<textarea name="" id="input_text" cols="30" rows="10"> El documento presenta los orígenes de la profesión, el contexto general y el contexto específico de la Ingeniería de Sistemas, la coherencia entre el proyecto educativo institucional y este proyecto educativo de programa, la misión, visión, los elementos fundamentales del modelo educativo y pedagógico del programa y las estrategias pedagógicas que le dan identidad a la formación ofrecida por la UNAB en su programa de Ingeniería de Sistemas.</textarea>
</div>
<div class="settings">
  <a id="comenzarj">Empezar</a> | <a href="#/TypingSpeed" id="reset">Reiniciar</a>
</div>
</div>

<br>
<hr>
<h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>
</v-app>
</template>

<script>

import asd from "./PaginaTS1.vue"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
 const $ = require('jquery')
     window.$ = $




$(document).unbind('keydown').bind('keydown', function (event) {
    if (event.keyCode === 8) {
        var doPrevent = true;
        var types = ["text", "password", "file", "search", "email", "number", "date", "color", "datetime", "datetime-local", "month", "range", "search", "tel", "time", "url", "week"];
        var d = $(event.srcElement || event.target);
        var disabled = d.prop("readonly") || d.prop("disabled");
        if (!disabled) {
            if (d[0].isContentEditable) {
                doPrevent = false;
            } else if (d.is("input")) {
                var type = d.attr("type");
                if (type) {
                    type = type.toLowerCase();
                }
                if (types.indexOf(type) > -1) {
                    doPrevent = false;
                }
            } else if (d.is("textarea")) {
                doPrevent = false;
            }
        }
        if (doPrevent) {
            event.preventDefault();
            return false;
        }
    }
});

export default{

  data(){
    return {
        tabla: [],
        elapsedTime: 0,
        timer: undefined,
        tiempodeJuego: 0, //En segundos,
        nombre: undefined,
        pass: undefined,

        }
    },
    mounted(){
       let vue = this;
       var tabla = [ ];
       axios.get('https://pepunab.herokuapp.com/PepData/getAll/TypingChallenge',{ crossdomain: true })
       .then(function(response){
       vue.posts = (response.data)
       console.log(vue.posts)
       for (var f in vue.posts) {
           tabla[f] = {Nombre : String(vue.posts[f].username), Tiempo : String(vue.posts[f].tiempo), WPM : String(vue.posts[f].puntuacion), Categoria : String(vue.posts[f].categoria)}
       }
           vue.tabla = (tabla)
       })

   },
   methods:{
   pickCategoria(wpm){
       var categorias = ['Noob','Principiante','Sargento','Veterano'];
       if(wpm < 20){
           return categorias[0];
       }else if(wpm < 40){
           return categorias[1];
       }else if(wpm < 60){
           return categorias[2];
       }else{
           return categorias[3];
       }
   },
   actualizarRanking(categoria,timer,wpm){
       axios.put('https://pepunab.herokuapp.com/PepData/put/TypingChallenge/'+window.myGlobalName+'/'+window.myGlobalPass+'/'+
       timer+'/'+wpm+'/'+categoria,{crossdomain: true})
       .then(function(response){
           console.log(response);
       });

   },
   enviarInfo(timer,wpm){
        console.log("Qpasa")
        console.log(timer)
        console.log(wpm)
        console.log(window.myGlobalName)
        console.log(window.myGlobalPass)
        if(window.myGlobalName == null){
            alert("Inicia sesión para poder registrar tus datos");
        }else{
          this.actualizarRanking(this.pickCategoria(wpm),timer,wpm)
          setTimeout(() =>{window.history.go()},2000);
        }
   }

}
}



var letters = " El documento presenta los orígenes de la profesión, el contexto general y el contexto específico de la Ingeniería de Sistemas, la coherencia entre el proyecto educativo institucional y este proyecto educativo de programa, la misión, visión, los elementos fundamentales del modelo educativo y pedagógico del programa y las estrategias pedagógicas que le dan identidad a la formación ofrecida por la UNAB en su programa de Ingeniería de Sistemas.";
var character_length = 50;
var index = 0;
var started = false;
var current_string = letters.substring(index, index + character_length);

var wordcount = 0;


function playing(){

$(window).keypress(function(evt){
  if(!started){
    start();
    started = true;
  }
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode;
  var charTyped = String.fromCharCode(charCode);
  if(charTyped == letters.charAt(index)){
    if(charTyped == " "){
      wordcount ++;
      $("#wordcount").text(wordcount);
    }
    index ++;
    current_string = letters.substring(index, index + character_length);
    $("#target").text(current_string);
    $("#your-attempt").append(charTyped);
    if(index == letters.length){
      wordcount ++;
      $("#wordcount").text(wordcount);
      $("#timer").text(timer);
      if(timer == 0){
        timer = 1;
      }
      wpm = Math.round(wordcount / (timer / 60));
      $("#wpm").text(wpm);
      stop();
      finished();
    }
  }else{
    $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
    errors ++;
    $("#errors").text(errors);
  }
});

}



var timer = 0;
var wpm = 0;
var errors = 0;
var interval_timer;
let vue = this;




$("body").on("click", "#reset", function() {
  reset();
});

$("body").on("click", "#comenzarj", function() {
  playing();
});

function start(){
  interval_timer = setInterval(function(){
    timer ++;
    $("#timer").text(timer);
    wpm = Math.round(wordcount / (timer / 60));
    $("#wpm").text(wpm);
  }, 1000)
}

$("body").on("click", "#eo", function() {
  asd.methods.enviarInfo(timer,wpm);
  console.log("eo");
});


function stop(){
  clearInterval(interval_timer);
  started = false;
}

function reset(){
  $("#input_text").blur().hide();
  $("#your-attempt").text("");
  index = 0;
  errors = 0;
  clearInterval(interval_timer);
  started = false;
  letters = $("#input_text").val();
  $("#wpm").text("0");
  $("#timer").text("0");
  $("#wordcount").text("0");
  $("#errors").text("0");
  timer = 0;
  wpm = 0;
  current_string = letters.substring(index, index + character_length);
  $("#target").text(current_string);
}

function finished(){
  alert("¡Felicitaciones!\nWords per minute: " + wpm + "\nWordcount: " + wordcount + "\nErrors:" + errors);
  asd.methods.enviarInfo(timer,wpm);
  console.log("eo");
}



</script>

<style>

$yellow: #2222ff;
$red: #99f;
$white: #fff;

.loler{
width:33.3333%;
text-align:center;
}

#output{
text-align:center;
justify-content: center;
}


.container{
margin: 0 auto;
text-align:center;
justify-content: center;
width: 100%;
padding: 10px;
}


#focus{
  background:rgba(255,0,0,0.7);
  padding:20px;
  font-weight:bold;
  font-size:30px;
  color:#fff;
}

.mono{
  font-family:"Cutive Mono", monospace;
}

.wrong{
  background:$red;
  color:#fff;
}


.results{
  margin: auto;
  border: 3px;
  padding: 10px;
  width: 100%;
}

.stats{
display: flex;
  justify-content: center;
  overflow:hidden;
  margin-bottom:1em;
  height:100px;
  list-style:none;
  padding:5px 0;
  font-size:16px;
  font-weight:900;
  max-width:1000px;
  margin:0 auto;
  width:100%;
  li{
    width:25%;
    float:left;
  }
}

.target{
  color:#fff;
  text-align:left;
  font-size:32px;
  min-width:300px;
  min-height:40px;
  width:100%;
  display:inline-block;
  position:relative;
  white-space:pre;
  background:#333;
  box-shadow:inset 0 0 10px 0 rgba(255,255,255,0.2);
  padding:22px 10px 10px;
  &:after{
    content: '';
    position: relative;
    width: 20px;
    height: 2px;
    background: #f00;
    left: 10px;
    top: 53px;
  }
  &:before{
    font-family:Roboto;
    top:0;
    left:0;
    right:0;
    background:#000;
    content:'Type the text below';
    text-transform:uppercase;
    font-size:10px;
    padding:2px;
    text-align:left;
    position:absolute;
    color:#fff;
  }
}


.button{
  display:inline-block;
  padding:8px 10px;
  background:#057f24;
  border-radius:2px;
  color:#fff;
}

#textarea{
  position:absolute;
}

.spell{
  font-size:40px;
  font-weight:900;
  letter-spacing:2px;
  span{
    color:$yellow;
  }
}

#input_text{
  color:#fff;
  width:60%;
  margin:2em auto;
  display:none;
  position:relative;
  white-space:pre;
  background:#333;
  box-shadow:inset 0 0 10px 0 rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
}

.your-attempt{
  background:#222;
  color:#fff;
  padding:10px;
  min-height:100px;
  border:1px solid #555;
  max-width:700px;
  margin:2em auto;
  white-space:pre-wrap;
}

.results{
  font-family:Roboto;
}



.settings{
  padding:3px 6px 6px;
  font-family:Roboto, sans-serif;
  color:#999;
  text-align:center;
  text-shadow:0 0 6px rgba(0,0,0,0.6);
  font-size:16px;
  a{
    color:#fff;
    transition:color 0.2s;
    text-decoration:none;
    &:hover{
      color:#ccf;
    }
  }
}

</style>
