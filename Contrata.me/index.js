const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config.js');

const app = express();

/**
 * Se abre la conexion con la base de datos
 * */
dbConnection();

/*
  * Se configura cors 
  **/
app.use(cors());

/**
 * Directorio publico
 * En este directorio se agregara la aplicacion de react*/
app.use(express.static('./public'));

/*
  * Lectura y parseo del cuerpo de la peticion
  * */
app.use(express.json());

// Rutas de autenticacion estudiante: registro, login, renovar token
app.use( '/api/auth/estudiante', require( './routes/estudiante/auth' ));
app.use( '/api/auth/empresa', require( './routes/empresa/auth' ));
app.use( '/api/actions/empresa', require( './routes/empresa/info' ));
app.use( '/api/estudiantes/empresa', require( './routes/empresa/estudiantes'));
app.use( '/api/empresa/oferta', require( './routes/empresa/oferta'));

// Rutas para creacion de cv
app.use( '/api/cv', require( './routes/estudiante/cv' ));
app.use( '/api/empresas/estudiante', require( './routes/estudiante/empresas' ));
app.use( '/api/estudiante/git', require( './routes/estudiante/git' ));
app.use( '/api/actions/estudiante', require( './routes/estudiante/info' ));
// Rutas
// Rutas de oferta de trabajo: crud
// app.use( '/api/oferta', require( './routes/oferta' ));

// Rutas de consulta: buscar estudiante
// app.use( '/api/buscar/estudiante',
// 	    require( './routes/oferta' ));

// Rutas de consulta: buscar oferta
// app.use( '/api/buscar/oferta', require( './routes/oferta' ));

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});
