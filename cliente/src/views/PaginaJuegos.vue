<template>
  <v-app>

    <b-table striped hover :items="tabla"></b-table>
    <b-iconstack font-scale="5" animation="spin">
      <b-icon stacked icon="emoji-sunglasses" variant="info" font-scale="2.0" animation="throb" shift-v="8"></b-icon>
    </b-iconstack>

  </v-app>
</template>

<script>
import axios from 'axios'

export default{
    name : 'Inicio',
    data(){
      console.log("Sali");
      return{
        tabla: [],
      }
    },
    mounted(){
      let vue = this;
      var tabla = [ ];
      axios.get('http://localhost:3000/PepData/getAll/RuletaChallenge',{ crossdomain: true })
      .then(function(response){
        vue.posts = (response.data)
        console.log(vue.posts)
        for (var f in vue.posts) {
          tabla[f] = {Nombre : String(vue.posts[f].username), Tiempo : String(vue.posts[f].tiempo), Puntaje : String(vue.posts[f].puntuacion)}
        }
        console.log(tabla)
        vue.tabla = (tabla)
      })
    } 
}
</script>