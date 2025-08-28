//Modulo de express
const request = require('express');
const router = request.Router();

//Modulo de multer
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ dest:"uploads/", storage});
// Database
const connection = require('./Database/connection');

// Consultar registros activos
router.get('/', (req, res) =>{
    connection.query('SELECT * FROM products WHERE state = "A"', (error, results)=>{
        if(error) return res.status(400).send("Server error")
        return res.render('main', {results: results});
    })
})

// Image
router.get('/imgs/:name', (req, res)=>{
    const name = req.params.name;
    res.setHeader("content-type", "image");
    res.sendFile(`imgs/${name}`, {root:__dirname})
})

// Ruta para registro de productos
router.get('/product_register.ejs', (req, response) =>{
    response.render('product_register.ejs')
})

// Ruta para papelera
router.get('/backup.ejs', (req, res) =>{
    connection.query('SELECT * FROM products WHERE state = "D"', (error, results)=>{
        if(error) return res.status(400).send("Server error")
        return res.render('backup', {results: results});
    })
})

// Eliminar Registro de forma logica 
router.get('/delete/:id', (req, res)=>{
    const id = req.params.id;
    connection.query('UPDATE products SET state = "D" WHERE id = ?', [id], (error, results)=>{
        if(error) return res.status(400).send("Server error")
        res.send('<script >alert("Se han guardado los datos correctamente"); window.location.href="/";</script>');
    })
})

// Activar producto eliminado
router.get('/activate/:id', (req, res)=>{
    const id = req.params.id;
    connection.query('UPDATE products SET state = "A" WHERE id = ?', [id], (error, results)=>{
        if(error) return res.status(400).send("Server error")
        res.send('<script >alert("Se han guardado los datos correctamente"); window.location.href="/";</script>');
    })
})

// Eliminar registro fisicamente 
router.get('/physic_delete/:id', (req, res)=>{
    const id = req.params.id;
    connection.query('DELETE FROM products WHERE id = ?', [id], (error, results)=>{
        if(error) return res.status(400).send("Server error")
        return res.send('<script >alert("Se han guardado los datos correctamente"); window.location.href="/";</script>');
    })
})

// Ruta Actualizar y guardar registro 
const operations = require('./Controller/operations');
router.post('/save', upload.single('img_product') ,operations.save);
router.post('/update', upload.single('img_product'),operations.update);

// Consulta para consultar registros y mostrarlos en los campos
router.get('/update_delete.ejs/:id', (req, res) =>{
    const id = req.params.id;
    connection.query('SELECT * FROM products WHERE id = ?', [id], (error, results) =>{
        if(error) return res.status(400).send("Server error")
        return res.render('update_delete.ejs', {product: results[0]});
    })
})

// Exportamos router
module.exports = router;