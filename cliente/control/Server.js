const express = require('express');
const cors = require('cors');
const app = express();
app.listen(3000, () => {
  console.log("Server started on port 3000\n");
})

/*
Si no corre, instalar esto npm install express body-parser mongoose cors --save
Si tampoco entonces también esto npm install body-parser --save
y si nada pues F ~ :v ~ ^-^
*/

const api = require('./APIMongo.js');
var bodyParser = require('body-parser');
const { error } = require('console');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

//req.body.coleccion --> existen 3 colecciones en la DB Prueba 
//RuletaChallenge, TextChallenge, TypingChallenge

//Get desplegar datos de ranking
app.get('/PepData/getAll/:coleccion', (req, res) => {
  try {
    (async () => {
      console.log("GET recibido\n");
      res.json(await api.getDataDB(req.params.coleccion));
    })()
  } catch (error) {
    res.send("Se ha producido un error al obtener PepData");
  }
}),

//Get validacion jugar con el mismo jugador
app.get('/PepData/getValidation/:coleccion/:username/:password', (req, res) => {
  try {
    (async () => {
      console.log("GET recibido");
      //res.json(await api.getValidationPasswordDB("Javier","132"));
      res.json(await api.getValidationPasswordDB(req.params.coleccion,req.params.username,req.params.password));
    })()
  } catch (error) {
    res.send("Se ha producido un error al validar PepData");
  }
}),

//Get validar que no haya usernames repetidos
app.get('/PepData/getUserVerification/:coleccion/:username', (req, res) => {
  try {
    (async () => {
      console.log("GET recibido");
      //res.json(await api.getValidationPasswordDB("Javier","132"));
      
      /*Retorna el id_Object que es unico para cada documento --> entonces si retorna alguno,
      ese username ya existe, de lo contrario retorna null*/
      res.json(await api.getIdUsernameDB(req.params.coleccion,req.params.username));
    })()
  } catch (error) {
    res.send("Se ha producido un error al verificar PepData");
  }
}),

//Get obtener estadisticas de un juegador
app.get('/PepData/getUserEstadisticas/:coleccion/:username/:password', (req, res) => {
  try {
    (async () => {
      console.log("GET recibido");
      //res.json(await api.getValidationPasswordDB("Javier","132"));
      
      /*Retorna las estadisticas de un jugador ya registrado,
      si ese usuario no existe retorna null*/
      res.json(await api.getUsernameStatisticsDB(req.params.coleccion,req.params.username,req.params.password));
    })()
  } catch (error) {
    res.send("Se ha producido un error al verificar PepData");
  }
}),

//Post añadir nuevo jugador
app.post('/PepData/post/:coleccion/:username/:password', (req, res) => {
  try {
    (async () => {
      console.log("POST recibido");
      await api.insertDataDB(req.params.coleccion,req.params.username,req.params.password,"0","0","Noob");
      //await api.insertDataDB("Javier","132","0","0","noob");
    })()
  } catch (error) {
    res.send("Se ha producido un error al añadir PepData");
  }
})

//Put modificar estadisticas de un jugador, el usuario y contraseña no deben cambiar
app.put('/PepData/put/:coleccion/:username/:password/:tiempo/:puntuacion/:categoria', (req, res) => {
  try {
    (async () => {

      const filtro = String(await api.getIdObjectDB(
        req.params.coleccion,
        req.params.username,
        req.params.password)
      );

      if (filtro==="null"){
        res.send("Se ha producido un error al actualizar PepData");
        console.log("Se ha producido un error al actualizar PepData");
      }else{
        console.log("PUT recibido");
        await api.updateDataDB(
          req.params.coleccion,
          req.params.username,
          req.params.password,
          req.params.tiempo,
          req.params.puntuacion,
          req.params.categoria,
          filtro);
          /*await api.updateDataDB(
            "Cristhian",
            "1234",
            "120",
            "90",
            "Profesional",
            filtro);*/
      }
    })()
  } catch (error) {
    res.send("Se ha producido un error al actualizar PepData");
  }  
})

if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(dirname + '/public'));

app.get(/.*/ , (req, res) => res.sendFile(dirname + ' /public/index.html')); 
//El man lo hace para manejar la SPA 
}
const port = process.env.PORT || 3000;