import express from 'express';
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');

import { connection } from './bd.js';
import { metodoDelete } from './crood/delete.js';
import { metodoGet } from './crood/get.js';
import { metodoPatch } from './crood/patch.js';
import { metodoPost } from './crood/post.js';
import { Evento } from './crood/eventos.js';


const app = express();
const port = 3000;
const ruta = "/usuarios";




connection.connect(err => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos establecida');
    }
  });

// Middleware para analizar datos en solicitudes POST
app.use(bodyParser.json());

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  METODO GET
metodoGet(app, ruta);
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// metodo POST
metodoPost(app, ruta);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Metodo delete 
metodoDelete(app, ruta);

//  //////////////////////////////////////////////////////////////////////////////////////////////////////////////777
// METODO PATCH 
metodoPatch(app, ruta);

// INSERTAR EVENTO 
// Asocia la función Evento con la ruta /insertarEvento
const eve= "/eventos/:idUsuario"
Evento(app, eve);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API en ejecución en http://localhost:${port}`);
});
