<template>
  <v-app>

  <img src="../Imagenes/patio_central.jpg"/>
    <hr>
    <p>
      <br>
    </p>
    <p class="centrado">
      <img id="img1" src="../Imagenes/nanocomputacion.jpg" width="500"/>
      <img id="img2" src="../Imagenes/d.jpg" width="500"/>
    </p>
    <hr>
      <p class="texto">
      Esta página contiene el proyecto educativo de programa para la ingeniería de sistemas de
      la Universidad Autonoma de Bucaramanga. El documento presenta los orígenes de la profesión, el
      contexto general y el contexto específico de la Ingeniería de Sistemas, la coherencia entre el proyecto
      educativo institucional y este proyecto educativo de programa, la misión, visión, los elementos
      fundamentales del modelo educativo y pedagógico del programa y las estrategias pedagógicas que
      le dan identidad a la formación ofrecida por la UNAB en su programa de Ingeniería de Sistemas.
      Aprende sobre el por medio de este sitio web dinámico.
      <br>
      <br>
    </p>
    <p>
      <br>
      <br>
    </p>
    <hr>
    <h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>
  </v-app>
</template>

<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data: () => ({
    newToDo: "",
    uncompletedTodos: [],
    completedTodos: []
  }),
  methods: {
    created() {
    // fetch uncompleted task
      axios.get("http://localhost:3000/todo/uncompleted")
      .then(response => (this.uncompletedTodos = response.data))
      .catch(error => console.log(error));
      // fetch completed task
      axios.get("http://localhost:3000/todo/completed")
      .then(response => (this.completedTodos = response.data))
      .catch(error => console.log(error));
    },

    deleteTodo(todoID) {
      axios
      .delete("http://localhost:3000/todo/" + todoID).then(response => {
      console.log(response.data);
      });
    },
    completeTodo(todoID) {
      axios.post("http://localhost:3000/todo/complete/" + todoID)
      .then(response => {
      console.log(response.data);
      });
    },
    addToDo() {
      axios.post("http://localhost:3000/todo/add", {
        todo: this.newTodo
     }).then(response => {
       this.message = response.data;
     });
  }
},
};
</script>

<style>
p.centrado {
  text-align: center;
}

#img1,#img2 {
  width: 350px;
  height: 250px;
  object-fit: cover;
  margin-left:50px;
}

.texto{
  margin:auto;
  text-align: justify;
  width:48%;
}

.forbutton{
  margin: 0 auto;
  text-align:left;
  justify-content: center;
  width: 1000px;
  padding: 10px;
}


</style>
