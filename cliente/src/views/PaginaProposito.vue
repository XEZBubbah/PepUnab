<template>
  <v-app>
    <h2 style="text-align: center;font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;">¿Cuál es el proposito de la ingenieria de sistemas?</h2>
     <p class="centrado">
      <img src="../Imagenes/proposito.jpg" align="middle" width="300"/>
    </p>
    <p style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;">
<div class="texto">
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#PCI">Proposito Central de la Ingeniera de Sistemas</a></li>
    <li><a data-toggle="tab" href="#ORF">Objetivo Retador Facultad de Ingenieria</a></li>
    <li><a data-toggle="tab" href="#PCP">Proposito Central Programa de Ingenieria de Sistemas</a></li>
    <li><a data-toggle="tab" href="#ORP">Objetivo Retador Programa de Ingeniera de Sistemas</a></li>
  </ul>
</div>

<div class="tab-content">
  <div id="PCI" class="tab-pane fade in active">
    <h4 class="texto">Proposito Central de la Ingeniera de Sistemas</h4>
    <p class="texto">
        Formamos ingenieros de sistemas innovadores con pensamiento disruptivo que promueven la transformación digital 
        en un mundo en constante evolución.
        <br>
        </p>
  </div>
  <div id="ORF" class="tab-pane fade">
    <h4 class="texto">Objetivo Retador Facultad de Ingenieria</h4>
    <p class="texto">
        Para el 2024 la Facultad de Ingeniería de la UNAB tendrá el 70% de sus programas de pregrado acreditados nacionalmente
        y al menos dos programas de pregrado acreditados internacionalmente.
      <br>
      </p>
  </div>
  <div id="PCP" class="tab-pane fade">
    <h4 class="texto">Proposito Central Programa de Ingenieria de Sistemas</h4>
    <p class="texto">
      Formamos ingenieros creativos e innovadores para un mundo sostenible.
      <br>
      </p>
  </div>
  <div id="ORP" class="tab-pane fade">
    <h4 class="texto">Objetivo Retador Programa de Ingeniera de Sistemas</h4>
    <p class="texto"> 
      <br>
        Para el 2024 el programa de Ingeniería de Sistemas de la UNAB tendrá acreditación nacional e internacional de alta calidad. Será 
        reconocido por su pertinencia e innovación curricular, su influencia en el desarrollo del país mediante proyectos de investigación y 
        extensión, y la oferta de una certificación internacional; ubicándose dentro de los 20 mejores programas del país.
        <br>
    </p>
  </div>
</div>
    <hr>
    
  <div class="botones">
    <button type="button" class="btn btn-dark" ><a href="#"><router-link style="color: #FFFFFF" to='/RuletaPep'>RuletaPEP</router-link></a></button>  |
    <button type="button" class="btn btn-dark"><a href="#"><router-link style="color: #FFFFFF" to='/Palabra'>OrdenaPalabra</router-link></a></button> |
    <button type="button" class="btn btn-dark"><a href="#"><router-link style="color: #FFFFFF" to='/TypingSpeed'>Typing Text</router-link></a></button>
  </div>


    <hr>
    <h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>
  </v-app>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'PaginaContexto'
}

</script>

<style>
.botones{
  margin:auto;
  text-align: center;
  width:48%;
}

.texto{
  margin:auto;
  text-align: justify;
  width:48%;
}

p.centrado {
  text-align: center;
}
#img1,#img2 {
  width: 350px;
  height: 250px;
  object-fit: cover;
}
.tab{
  margin: auto;
  width: 50%;
  border: 3px;
  padding: 10px;
}

</style>