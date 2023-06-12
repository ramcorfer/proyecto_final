const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.save = async (req, res) => {
    
        const nombre = req.body.nombre
        const domicilio = req.body.domicilio
        const email = req.body.email
        const nif = req.body.nif
        const usuario = req.body.usuario
        const telefono = req.body.telefono
        const password = req.body.password
        let passHash = await bcryptjs.hash(password, 10)
        const rol = req.body.rol
        console.log(nombre + " - " +domicilio+ " - " +email+ " - " +nif +" - " +usuario+ " - " +telefono+ " - " +password+" -"+passHash+" - rol: "+rol)

        //consulta
        conexion.query('INSERT INTO usuarios SET ?', {nif:nif, nombre_us:nombre, usuario:usuario, telefono:telefono, email:email, password:passHash, domicilio:domicilio, rol:rol}, (error, results) => {
            if(error){console.log(error)}
            return res.redirect('admin');
           
        })
}

exports.update = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const domicilio = req.body.domicilio
    const email = req.body.email
    const nif = req.body.nif
    const usuario = req.body.usuario
    const telefono = req.body.telefono
    const rol = req.body.rol
   
    //consulta
    conexion.query('UPDATE usuarios SET ? WHERE id_us = ?', [{nif:nif, nombre_us:nombre, usuario:usuario, telefono:telefono, email:email, domicilio:domicilio, rol:rol}, id], (error, results) => {
        if(error){console.log(error)}
        return res.redirect('admin');
       
    })
}
