<template>
  <v-app>
  <div class=center >
    <h2 style="text-align: center;font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;">¿Cómo se estudia la ingeniería de sistemas en la UNAB?</h2>
    <br>
    <br>
    <img id="imgp" src="../Imagenes/unnamed.jpg"/>
    <br>
    <br>
  </div>


  <div class=texto>
    <p id="info">Los docentes del programa integran y apropian enfoques pedagógicos reconocidos por la comunidad académica. Propuestas como el aprendizaje centrado en el estudiante, el aprendizaje basado en proyectos, aprendizaje basado en problemas y el aprendizaje basado en casos.
      <br>
      <br>
    El programa de Ingeniería de Sistemas de la UNAB considera fundamental una formación interdisciplinaria desde una visión sistémica que prepare al estudiante para articular grupos interdisciplinarios. Las Electivas de otros programas contribuyen a acercar al Ingeniero de Sistemas con su vocación integradora de las disciplinas.
      <br>
      <br>
    Todos los cursos del Programa de Ingeniería de Sistemas se enfocan en el desarrollo de las competencias fundamentales de la disciplina:
      <br>
    </p>
  </div>

  <section>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="card text-center">
            <div class="title">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
              <h2>Competencias</h2>
            </div>
            <div class="price">
              <h4></h4>
            </div>
            <div class="option">
              <ul>
              <br>
              <p> <i class="fa fa-check" aria-hidden="true"></i> La investigación formativa es lograda por medio de proyectos integradores, trabajos de grado y docentes miembros de los grupos de investigación adscritos al programa. Esto permite garantizar el logro de las metas de formación e introducir el uso de nuevas tecnologias por parte de los estudiantes. </p>
              </ul>
            </div>
          </div>
        </div>
        <!-- END Col one -->
        <div class="col-sm-4">
          <div class="card text-center">
            <div class="title">
              <i class="fa fa-plane" aria-hidden="true"></i>
              <h2>Investigación</h2>
            </div>
            <div class="price">
              <h4></h4>
            </div>
            <div class="option">
              <ul>
              <br>
              <li> <i class="fa fa-check" aria-hidden="true"></i> Diseñar </li>
              <li> <i class="fa fa-check" aria-hidden="true"></i> Modelar</li>
              <li> <i class="fa fa-check" aria-hidden="true"></i> Evaluar </li>
              <li> <i class="fa fa-check" aria-hidden="true"></i> Adaptar </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card text-center">
            <div class="title">
              <i class="fa fa-rocket" aria-hidden="true"></i>
              <h2>Herramientas de aprendizaje</h2>
            </div>
            <div class="price">
              <h4></h4>
            </div>
            <div class="option">
              <ul>
              <p> <i class="fa fa-check" aria-hidden="true"></i> Se enfatiza en el uso de las TIC como herramientas útiles e indispensables para el aprendizaje continuo y significativo, mediante la aplicación de TEMA (Tecnologias de la enseñanza para el mejoramiento del Aprendizaje) </p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="botones">
  <button type="button" class="btn btn-dark"><a href="#" ><router-link style="color: #FFFFFF" to='/RuletaPep'>RuletaPEP</router-link></a></button>  |
  <button type="button" class="btn btn-dark"><a href="#" ><router-link style="color: #FFFFFF" to='/Palabra'>OrdenaPalabra</router-link></a></button> |
  <button type="button" class="btn btn-dark"><a href="#" ><router-link style="color: #FFFFFF" to='/TypingSpeed'>Typing Text</router-link></a></button>
</div>

<hr>
<h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>


  </v-app>
</template>

<style>

.texto{
  width:100%;
}

.botones{
  margin:auto;
  text-align: center;
  width:48%;
}


#imgp{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

#info{
  font-family: 'Courier New', Arial, Courier, monospace;
  font-weight:550;
  text-align: justify;
  background-color: transparent;
}

section{
  width: 100%;
  height: 80vh;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 80px 0;
}
.card{
  position: relative;
  max-width: 500px;
  height: auto;
  background: linear-gradient(-45deg,#fe0847,#feae3f);
  border-radius: 15px;
  margin: 0 auto;
  padding: 40px 0px;
  -webkit-box-shadow: 0 10px 15px rgba(0,0,0,.1) ;
          box-shadow: 0 10px 15px rgba(0,0,0,.1) ;
-webkit-transition: .5s;
transition: .5s;
}
.card:hover{
  -webkit-transform: scale(1.1);
          transform: scale(1.1);
}
.col-sm-4:nth-child(1) .card ,
.col-sm-4:nth-child(1) .card .title .fa{
  background: linear-gradient(-45deg,#e2d921,#ff9500);

}
.col-sm-4:nth-child(2) .card,
.col-sm-4:nth-child(2) .card .title .fa{
  background: linear-gradient(-45deg,#e2d921,#ff9500);

}
.col-sm-4:nth-child(3) .card,
.col-sm-4:nth-child(3) .card .title .fa{
  background: linear-gradient(-45deg,#e2d921,#ff9500);

}
.card::before{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: rgba(255, 255, 255, .1);
z-index: 1;
-webkit-transform: skewY(-5deg) scale(1.5);
        transform: skewY(-5deg) scale(1.5);
}
.title .fa{
  color:#fff;
  font-size: 60px;
  width: 100px;
  height: 100px;
  border-radius:  50%;
  text-align: justify;
  line-height: 100px;
  -webkit-box-shadow: 0 10px 10px rgba(0,0,0,.1) ;
          box-shadow: 0 10px 10px rgba(0,0,0,.1) ;

}
.title h2 {
  position: relative;
  margin: 10px  0 0;
  color: #fff;
  font-size: 28px;
 z-index: 2;
}
.price,.option{
  position: relative;
  z-index: 2;
}
.price h4 {
margin: 0;
padding: 0;
color: #fff;
font-size: 60px;
}
.option ul {
  margin: 0;
  padding: 0;

}

.option ul li {
margin: 0 auto;
padding: 0;
list-style: none;
color: #fff;
font-size: 16px;
}

.option ul p {
margin: 0 auto;
padding: 0;
list-style: none;
color: #fff;
font-size: 16px;
}

.card a {
  position: relative;
  z-index: 2;
  background: #fff;
  color : black;
  width: 150px;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  display: block;
  text-align: justify;
  margin: 20px auto 0 ;
  font-size: 16px;
  cursor: pointer;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
          box-shadow: 0 5px 10px rgba(0, 0, 0, .1);

}
.card a:hover{
    text-decoration: none;
}


</style>
