const connection = require('../Database/connection');

//Guardar los datos del registro
exports.save = (req, res)=>{ 
    const name = req.body.product_name;
    const price = req.body.price;
    const size = req.body.size;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const img_product = req.file.buffer;
    connection.query('INSERT INTO products SET ?', {product_name: name, price: price, size: size, quantity: quantity, desscription: description, img_product: img_product}, (error, results) =>{
        if(error) return res.status(400).send("Server error"+error)
        return res.send('<script >alert("Se han guardado los datos correctamente"); window.location.href="/";</script>');
    })
};

//Actualizar los datos de la lista de productos 
exports.update = (req, res) =>{
    const id = req.body.id;
    const name = req.body.product_name;
    const price = req.body.price;
    const size = req.body.size;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const img_product = req.file?.buffer;
    
    const update = {
        product_name : name,
        price : price,
        size : size,
        quantity : quantity,
        desscription: description
    }
    //actualiza la imagen si es modificada
    if(img_product) update.img_product = img_product;
    connection.query('UPDATE products SET ? WHERE id = ?', [update, id], (error, results)=>{
        if(error) return res.status(400).send("Server error")
        return res.send('<script >alert("Se han guardado los datos correctamente"); window.location.href="/";</script>');
    })
};