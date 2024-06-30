const db = require("../db/db");
//GET
const index = (req, res) => {
    const sql = "SELECT * FROM productos"; 
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "Intente más tarde"});
        }
        res.json(rows);
    });
};

//POST
const show = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM productos WHERE id =?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "Intente más tarde"});
        }
        if (rows.length== 0) {
            return res.status(404).json({error: "No existe el producto"});
        }
        //console.log(rows)
        res.json(rows[0]);
    });

    // Recorre cada uno de los elementos y valida si cada uno es igual a los recibidos por parámetros
    //const producto = productos.find((elemento) => elemento.id == req.params.id);
    // en caso de que no exista el producto
    /*if (!producto) {
        res.status(404).json({ error: "No existe el producto"});
    } else {
        // Si se cumple la validación anterior, responde con el producto
        res.send(producto);
    }*/
};

//PUT
const store = (req, res) => {
    const { nombre, stock, precio} = req.body;
    const sql = "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)";
    db.query(sql, [nombre, precio, stock], (error, result) => {
        if (error) {
            return res.status(500).json({error: "Intente más tarde"});
        }    
        const producto = {...req.body, id: result.insertId};
        res.json(producto);
    })
};

const update = (req, res) =>  {
    const { id } = req.params;
    const { nombre, stock, precio} = req.body;
    const sql = "UPDATE productos set nombre = ?, stock = ?, precio = ? WHERE id = ?";
    db.query(sql, [nombre, stock, precio, id], (error, result) => {
        if (error) {
            return res.status(500).json({error: "Intente más tarde"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({error: "No existe el producto"});
        }
        const producto = { ...req.body, ...req.params };
        res.json(producto);
    });
};

//DELETE
const destroy = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id = ?"
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde"});
        }
        res.json({mensaje: `Producto ${id} borrado`});
    });
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};