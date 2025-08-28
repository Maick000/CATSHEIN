require('dotenv').config();

// modulo mysql
const mysql = require('mysql');

//Conexion con la base de datos
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

//Verificacion de la conexion 
connection.connect((error) =>{
    if(error){
        console.error('Hubo un error: '+error);
        return
    } else{
        console.log('Conexión exitosa.');
    }
})
//exportamos conexion
module.exports = connection;