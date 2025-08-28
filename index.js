require('dotenv').config();

// modulo express
const request = require('express');
const project = request();

// motor de plantillas ejs
project.set('view engine', 'ejs');

// Procesar peticiones 
project.use(request.urlencoded({extended:false}));
// middleware que solo analiza json
project.use(request(JSON));

// router
project.use('/', require('./router'));

PORT = process.env.PORT || 4000
// escuchar el servidor en el puerto asignado
project.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
});