const express = require("express");

//Creamos una instancia del router de Express
const router = express.Router();

//Se define una ruta para obtener los resultados
//Cuando se haga una solicitud GET a la ruta, se ejecutará esta función
//Se antepone /productos para manejar las rutas que comiencen con productos

const productos = [
    {id: 1, nombre: "Producto Nro 1", stock: 10},
    {id: 2, nombre: "Producto Nro 2", stock: 5},
    {id: 3, nombre: "Producto Nro 3", stock: 15},
]

router.get('/', (req, res) => {
    // Envía una respuesta en formato JSON con un mensaje
    res.json(productos);
});

// /productos/3/categoria/5?order=nombre&limit=10

router.get("/:id", (req, res) => {
    console.log(req.params.id);

    // Recorre cada uno de los elementos y valida si cada uno es igual a los recibidos por parámetros
    const producto = productos.find((elemento) => elemento.id == req.params.id);
    // en caso de que no exista el producto
    if (!producto) {
        res.status(404).json({ error: "No existe el producto"});
    } else {
        // Si se cumple la validación anterior, responde con el producto
        res.send(producto);
    }
});

router.post("/", (req, res) => {
    //console.log(req.body);

    const producto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        stock: req.body.stock,
    };

    productos.push(producto);

    res.status(201).send(producto);
});

router.put('/:id', (req, res) => {
    //console.log(req.params);
    //console.log(req.body);  

    //En caso de que no exista el producto
    const producto = productos.find((elemento) => elemento.id == req.params.id);    
    if (!producto) {
        return res.status(404).json({ error: "No existe el producto"});
    }

    producto.nombre = req.body.nombre;
    producto.stock = req.body.stock;

    res.send(producto);
});

//La opción del profesor
// router.delete("/:id", (req, res) => {
//     const producto = productos.find((elemento) => elemento.id == req.params.id);    
//     if (!producto) {
//         return res.status(404).json({ error: "No existe el producto"});
//     }
//     //Busca en la raíz donde se encuentra el producto
//     const productoIndex = productos.findIndex(
//         (elemento) => elemento.id == req.params.id
//     );
//     //Borra el elemento
//     productos.splice(productoIndex, 1);
//     //Informa acerca del elemento borrado
//     res.json(producto);
// });

//La opción de CaC
router.delete("/:id", (req, res) => {   
    const productoIndex = productos.findIndex((elemento) => elemento.id == req.params.id);
    if (productoIndex=== -1) {
        return res.status(404).json({ error: "No existe el producto"});
    }
    const deletedproducto = productos.splice(productoIndex,1);
    res.json(deletedproducto);
});

//Exporta el router para que pueda ser utilizado en otros archivos
module.exports = router;