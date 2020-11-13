<template>
    <v-app>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #ffa834;">
    <h1 style="font-family: 'Courier New', Arial, Courier, monospace; font-weight:550;"><router-link to='/'>PEPWEB</router-link></h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent"
    style="font-family: 'Open Sans'; font-weight: bold;">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" >
            <h5 ><router-link to='/Contexto'>¿Qué es la Ing. de Sistemas?</router-link></h5>
        </li>
        <li class="nav-item" >
            <h5 ><router-link to='/Proposito'>Propósitos de la Ing. de Sistemas</router-link></h5>
        </li>
        <li class="nav-item" >
            <h5 ><router-link to='/Estudia'>¿Cómo se estudia?</router-link></h5>
        </li>
        <li class="nav-item">
            <h5 ><router-link to='/Perfil'>Perfil de egresados</router-link></h5  >
        </li>
      </ul>
      </div>
    </nav>
    <router-view/>
    </v-app>
</template>

<script>
</script>
<style>
    html{
      max-width:1000px;
      width:100%;
      margin: 0 auto;
      background: rgb(255,168,52);
      background: linear-gradient(180deg, rgba(255,168,52,1) 0%, rgba(241,121,8,1) 36%, rgba(237,222,53,1) 72%, rgba(245,245,168,1) 88%);
}
</style>
