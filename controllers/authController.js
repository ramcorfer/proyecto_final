const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const {promisify} = require('util');

//Procedimiento de registro asíncrono
exports.register = async (req, res) => {

    try {
        const nombre = req.body.nombre
        const domicilio = req.body.domicilio
        const email = req.body.email
        const nif = req.body.nif
        const usuario = req.body.usuario
        const telefono = req.body.telefono
        const password = req.body.password
        let passHash = await bcryptjs.hash(password, 10)
        console.log(nombre + " - " +domicilio+ " - " +email+ " - " +nif +" - " +usuario+ " - " +telefono+ " - " +password+" -"+passHash)

        //consulta
        conexion.query('INSERT INTO usuarios SET ?', {nif:nif, nombre_us:nombre, usuario:usuario, telefono:telefono, email:email, password:passHash, domicilio:domicilio, rol:2}, (error, results) => {
            if(error){console.log(error)}
            res.redirect('personal');
            console.log('Usuario creado')
        })

    } catch (error) {
        console.log(error)
    }

    
}

