<template>
  <v-app>

    <div class=center >
      <h2 style="text-align: center;font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;">Perfil del Ingeniero de Sistemas UNAB</h2>
      <img id="imgp" src="../Imagenes/p.jpg" width="100%"/>
    </div>

    <div class=tab>
      <ul class="nav nav-tabs">
        <li><a data-toggle="tab" href="#P">Perfil</a></li>
        <li><a data-toggle="tab" href="#C">Competencias</a></li>
        <li><a data-toggle="tab" href="#OF">Objeto de Formación</a></li>
      </ul>

      <div class="tab-content">
        <div id="P" class="tab-pane fade in active">
          <br>
          <p>El Ingeniero de Sistemas UNAB es un profesional que, desde su compromiso con lo local y
          con una visión mundial, orienta su labor al logro del bien común, abordando problemáticas caracterizadas por la ausencia o escasez de unidad en la información y el conocimiento, ejerciendo
          con competencia en Sistémica, Ciencias Computacionales y Tecnologías de la Informacíon y la Comunicacín, la evaluacíon, el diseño, la auditoría, la adaptación y la administración de soluciones
          desarrolladas mediante el método del diseño de la ingeniería, haciendo pertinente, coherente, viable
          y sostenible su labor en los contextos organizacional, social y medioambiental.</p>
        </div>
        <div id="C" class="tab-pane fade">
          <br>
          <h5>Competencia Fundamental</h5>
          <p>Capacidad de insertar su labor en el contexto próximo y en el contexto amplio de lasociedad de manera ética.</p>
          <br>
          <h5>Competencias Derivadas</h5>
          <p>-Capacidad de reconocer como el contexto determina la forma de las soluciones tecnológicas. Momento de Apropoación</p>

          <p>-Capacidad para reconocer el problema, situación o proceso en su contexto que permitan aplicar, adaptar, diseñar, implementar, evaluar y administrar soluciones tecnológicas como intervención para superar la ausencia o escasez de unidad en la información y conocimiento. Momentos de Aplicación, Diseño, Evaluación y Crítica y de innovación</p>

          <p>-Capacidad para evaluar el grado de pertinencia de una solución tecnológica con el problema y contexto que pretende intervenir. Momento de Evaluación</p>

          <p>-Capacidad para evaluar el impacto cultural, social, ambiental, organizacional y tecnológico de soluciones tecnológicas que aborden la carencia o escasez de unidad en la información y el conocimiento. Momento de evaluación</p>
        </div>
        <div id="OF" class="tab-pane fade">
          <br>
          <p>El Ingeniero de Sistemas UNAB es un profesional y un ciudadano íntegro que se ocupa de resolver científicamente, problemáticas que tienen que ver con la ausencia o escasez de unidad en
          la información o el conocimiento sobre un determinado fenómeno, proceso, o situación humana,
          en general. Para ello apela, por un lado, a teorías y metodologías de modelado de sistemas; y, por
          otro lado, a las tecnologías computacionales para el tratamiento de información y conocimiento.
          Está dotado de las cualidades intelectuales, éticas y de gestión necesarias para circunscribir su
          labor profesional en el contexto amplio de la sociedad a la cual sirve.</p>
          <br>
          <p>Es por esto que el programa de Ingeniería de Sistemas UNAB establece tres tipos de metas de formación: personal, científica y profesional.
          El plan de estudios del mismo fue diseñado de manera tal que todos los cursos mantienen la coherencia con el objeto y metas de formación planteadas.</p>
        </div>
      </div>
    </div>

    <div class="botones">
      <button type="button" class="btn btn-dark"><a href="#"><router-link to='/RuletaPep'>RuletaPEP</router-link></a></button>  |
      <button type="button" class="btn btn-dark"><a href="#"><router-link to='/Palabra'>OrdenaPalabra</router-link></a></button> |
      <button type="button" class="btn btn-dark"><a href="#"><router-link to='/TypingSpeed'>Typing Text</router-link></a></button>
    </div>
    <hr>
    <h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>


  </v-app>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'PaginaPerfil'
}
</script>

<style>

.botones{
  margin:auto;
  text-align: center;
  width:48%;
}

li{
width:33.3333%;
text-align:center;
}

.center {
  margin: auto;
  border: 3px;
  padding: 10px;
}

.tab{
  margin: auto;
  border: 3px;
  padding: 10px;
  width: 100%;
}

.info{
  margin: auto;
}

.parag{
  margin:auto;
}

#imgp{
  border-radius: 10%;
}
#buttond {
 padding: 0;
 }

#buttond li {
 display: inline;
 }

#buttond li button {
  font-family: Arial;
  font-size: 11px;
  text-decoration: none;
  float: left;
  padding: 15px;
  width: 33.3333%;
  background-color: #2175bc;
  color: #fff;
  text-align:center;
  }

#buttond li button:hover {
   background-color: #2586d7;
   margin-top: -2;
   padding-bottom: 12px;
   }

</style>
