const {ObjectId} = require('mongodb');
const {MongoClient} = require('mongodb');

module.exports = {
    listDatabases : async function (){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            databasesList = await client.db().admin().listDatabases();
    
            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    getDataDB : async function (coleccion){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');
            // execute find query
            const items = await db.collection(String(coleccion)).find({}).sort({categoria:-1}).toArray();
            return items;
            // close connection
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    getValidationPasswordDB : async function (coleccion,usuario,codigo){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');
            const items = await db.collection(String(coleccion)).find({password:codigo,username:usuario}).toArray();
            return items;
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    getIdObjectDB : async function (coleccion,usuario,codigo){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');
            const items = await db.collection(String(coleccion)).find({password:codigo,username:usuario}).toArray();

            var aux = null;
            for (const property in items[0]) {
                aux = items[0][property];
                //console.log(`${property}: ${items[0][property]}`);
                break;
            }
            return aux;
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    getIdUsernameDB : async function (coleccion,usuario){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');
            const items = await db.collection(String(coleccion)).find({username:usuario}).toArray();

            var aux = null;
            for (const property in items[0]) {
                aux = items[0][property];
                //console.log(`${property}: ${items[0][property]}`);
                break;
            }
            return aux;
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    getUsernameStatisticsDB : async function (coleccion,usuario,codigo){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');
            const items = await db.collection(String(coleccion)).find({password:codigo,username:usuario}).toArray();

            return [items[0]['tiempo'],items[0]['puntuacion']];
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    updateDataDB : async function (coleccion,data1,data2,data3,data4,data5,filtro){ 
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});
        
        try {
            await client.connect();
            const db = client.db('Prueba');
            
            await db.collection(String(coleccion)).updateOne(
            //en el $set: {clave:valor} clave no actua como parametro, actua como propiedad, en resumen,
            {
                _id: ObjectId(filtro)
            },
            { 
                $set: {
                    username: data1,
                    password: data2,
                    tiempo: data3,
                    puntuacion: data4,
                    categoria: data5
                },
                //$currentDate: {lastModified: true } 
            }).then(function(result) {
                console.log("Actualización exitosa")
            }
        )
        } catch (e) {
            console.error(e);
        }
        finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    insertDataDB : async function (coleccion,data1,data2,data3,data4,data5){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');
            const items = await db.collection(String(coleccion)).insertOne(
            {
                username: data1,
                password: data2,
                tiempo: data3,
                puntuacion: data4,
                categoria: data5
            }).then(function(result) {
                console.log("Inserción exitosa")
            })
            return items;
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        }
    },

    deleteDataDB : async function (id){
        const uri = "mongodb+srv://dbCristhian:generic4deo@pepweb.4t2rs.mongodb.net/Prueba?retryWrites=true&w=majority";
        const client = new MongoClient(uri,{useUnifiedTopology: true});

        try {
            await client.connect();
            const db = client.db('Prueba');

            await db.collection('Usuarios').deleteOne({ 
            codigo : id,
            // id es un diccionario donde esta la clave y valor del filtro {key:value}
            status: "D" //Filtro para eliminar un documento x
            }).then(function(result) {
            console.log("Eliminación exitosa")
        })
        } catch (e) {
            console.error(e);
        }finally{
            client.close();
            console.log("Sesion cliente finalizada");
        } 
    }
}
