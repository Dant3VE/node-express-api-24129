const express = require("express");
const router = express.Router();

const controller = require('../controllers/productos.controller')

//Se define una ruta para obtener los resultados
//Cuando se haga una solicitud GET a la ruta, se ejecutará esta función
//Se antepone /productos para manejar las rutas que comiencen con productos

router.get("/", controller.index);

// /productos/3/categoria/5?order=nombre&limit=10

router.get("/:id", controller.show);
router.post("/", controller.store);
router.put('/:id', controller.update);
router.delete("/:id", controller.destroy);

//Exporta el router para que pueda ser utilizado en otros archivos
module.exports = router;