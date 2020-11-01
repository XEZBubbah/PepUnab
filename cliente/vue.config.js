const path = require('path');

module.exports = {

  outputDir: path.resolve(__dirname,'cliente/control/Server.js'),

  devServer:{
    proxy:{
      'PepData/getAll/RuletaChallenge':{
        target: 'http://localhost:3000/'
      },
      'PepData/getAll/TextChallenge':{
        target: 'http://localhost:3000/'
      },
      'PepData/getAll/TypingChallenge':{
        target: 'http://localhost:3000/'
      },
      'PepData/getUserEstadisticas/RuletaChallenge/':{
        target: 'http://localhost:3000/'
      },
      'PepData/put/RuletaChallenge/':{
        target: 'http://localhost:3000/'
      },
      'PepData/getUserEstadisticas/TextChallenge/':{
        target: 'http://localhost:3000/'
      },
      'PepData/put/TextChallenge/':{
        target: 'http://localhost:3000/'
      }
    }
  },
  "transpileDependencies": [
    "vuetify",
  ]
};