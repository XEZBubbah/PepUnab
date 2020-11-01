<template>
<v-app>
<div class=container>
<h1 id="output"></h1>
<div class="botones">
    <b-button  type="button" variant="outline-warning"><router-link to='/loginTS' style="color: #050505">Iniciar Sesión</router-link></b-button> |
    <b-button  type="button" variant="outline-info"><router-link to='/registroTS' style="color: #050505">Registrarse</router-link></b-button> |
    <b-button  type="button" variant="outline-success" style="color: #050505">Jugar</b-button>
</div>
<br>
<div class="target mono" id="target"></div>
<div id="your-attempt" class="mono your-attempt" placeholder="Your text will appear here"></div>
<div class="results">
  <ul class="stats">
    <li>Palabras por minuto <span id="wpm">0</span></li>
    <li>Contador de palabras<span id="wordcount">0</span></li>
    <li>Tiempo <span id="timer">0</span></li>
    <li>Errores <span id="errors">0</span></li>
  </ul>
</div>
<hr style="clear:both;" />
<div>
<textarea name="" id="input_text" cols="30" rows="10">El documento presenta los orígenes de la profesión, el
contexto general y el contexto específico de la Ingeniería de Sistemas, la coherencia entre el proyecto
educativo institucional y este proyecto educativo de programa, la misión, visión, los elementos
fundamentales del modelo educativo y pedagógico del programa y las estrategias pedagógicas que
le dan identidad a la formación ofrecida por la UNAB en su programa de Ingeniería de Sistemas.</textarea>
</div>
<div class="settings">
  <a href="#/TypingSpeed" id="reset">Reset</a> |  <a href="#" id="pause">Pause</a>
</div>
</div>
<div>
    <h2 style="margin-top: 3%;text-align: center;">Scores</h2>
    <b-table style="text-align: center;" striped hover :items="tabla"></b-table>
</div>
</v-app>
</template>

<script>

import axios from 'axios';
 const $ = require('jquery')
     window.$ = $

var window_focus;

$(window).focus(function() {
    window_focus = true;
}).blur(function() {
  window_focus = false;
});

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
        tiempodeJuego: 0, //En segundos
        wpm: 0,
        }
    },
    mounted(){
       let vue = this;
       var tabla = [ ];
       axios.get('http://localhost:3000/PepData/getAll/TypingChallenge',{ crossdomain: true })
       .then(function(response){
       vue.posts = (response.data)
       console.log(vue.posts)
       for (var f in vue.posts) {
           tabla[f] = {Nombre : String(vue.posts[f].username), Tiempo : String(vue.posts[f].tiempo), WPM : String(vue.posts[f].puntaje), Categoria : String(vue.posts[f].categoria)}
       }
           vue.tabla = (tabla)
       })
   },
   actualizarRanking(categoria){
       axios.put('http://localhost:3000/PepData/put/TypingChallenge/'+this.$sesion+'/'+this.$pass+'/'+
       this.tiempodeJuego+'/'+this.WPM+'/'+categoria,{crossdomain: true})
       .then(function(response){
           console.log(response.data);
       });
   },
   async compActEsta(){
       return await axios.get('http://localhost:3000/PepData/getUserEstadisticas/TypingChallenge/'+
       this.$sesion+'/'+this.$pass,{crossdomain: true})
   },
   pickCategoria(wpm,puntuacion){
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


}


$(document).ready(function(){



// The base speed per character
let time_setting = 30;
// How much to 'sway' (random * this-many-milliseconds)
let random_setting = 100;
// The text to use NB use \n not real life line breaks!
let input_text = "¿Qué tan rápido puedes escribir?";
// Where to fill up
let target_setting = $("#output");
// Launch that function!
type(input_text, target_setting, 0, time_setting, random_setting);

function type(input, target, current, time, random){
  if(current > input.length){
    console.log("Complete.");
  }
  else{
 console.log(current)
    current += 1;
    // fill the target with a substring, from the 0th character to the current one
    target.text(input.substring(0,current));
    // Wait ...
    setTimeout(function(){
      // do the function again, with the newly incremented marker
      type(input, target, current, time, random);
      // Time it the normal time, plus a random amount of sway
    },time + Math.random()*random);
  }
}

/*
 * The typing test stuff
 */

var letters = $("#input_text").val();
var character_length = 50;
var index = 0;
var started = false;
var current_string = letters.substring(index, index + character_length);

var wordcount = 0;

$("html, body").click(function(){
  $("#textarea").focus();
});

$("#target").text(current_string);
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

var timer = 0;
var wpm = 0;
var errors = 0;
var interval_timer;

$("#reset").click(function(){
  reset();
});

$("#change").click(function(){
  $("#input_text").show().focus();
});

$("#pause").click(function(){
  stop();
});

$("#input_text").change(function(){
  reset();
});

function start(){
if(this.$sesion == undefined && this.$pass == undefined)
{
   alert("Por favor, inicia Sesión o registrate para jugar !! ^-^");
}else{
  interval_timer = setInterval(function(){
    timer ++;
    $("#timer").text(timer);
    wpm = Math.round(wordcount / (timer / 60));
    $("#wpm").text(wpm);
  }, 1000)
  }
}

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
}

  if(window_focus){
    $("#focus").hide();
  }
  $(window).focus(function() {
    $("#focus").hide();
  });
});

</script>

<style>

$yellow: #2222ff;
$red: #99f;
$white: #fff;


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

hr{
  margin:1em 0;
  max-width:800px;
  border:none;
  border-top:1px solid rgba(255,255,255,0.3);
  margin:0 auto;
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
    -webkit-animation:cursor_flash .5s infinite;
    -moz-animation:   cursor_flash .5s infinite;
    -o-animation:     cursor_flash .5s infinite;
    animation:        cursor_flash .5s infinite;
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


@-webkit-keyframes cursor_flash {
  0%   { background: $white; }
  50%  { background: $red; }
  100% { background: $white; }
}
@-moz-keyframes cursor_flash {
  0%   { background: $white; }
  50%  { background: $red; }
  100% { background: $white; }
}
@-o-keyframes cursor_flash {
  0%   { background: $white; }
  50%  { background: $red; }
  100% { background: $white; }
}
@keyframes cursor_flash {
  0%   { background: $white; }
  50%  { background: $red; }
  100% { background: $white; }
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

textarea{
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

.container{
border:1px solid black;
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
