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

exports.login = async (req, res) => {
    try {
        const usuario = req.body.usuario
        const password = req.body.password
        if( !usuario || !password ) {
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 5000, 
                ruta: 'login'
            })
        }


        //Consulta
        conexion.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (error, results) => {
            if(results.length == 0 || ! ( await bcryptjs.compare(password, results[0].password)) ){
                res.render('login', {
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorretos",
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 5000,
                    ruta:'login'
                })
            }else{
                //Inicio de sesión validado
                const id = results[0].id
                const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
                console.log("Token: "+token+" para el usuario "+usuario)
                console.log("el rol de este usuario es: "+results[0].rol)

                const cookiesOptions = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 *60 *60 *1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions)
                if(results[0].rol == 1){
                    res.redirect('admin');
                }else{
                    res.redirect('personal');
                }
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//Documentacion JsonWebToken
exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id], (error, results) => {
                if(!results){return next()}
                req.usuario = results[0]
                return next()
            })
        } catch (error){
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/login')
}