const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const conexion = require('../database/db');

//router para las vistas
router.get('/', /*authController.isAuthenticated, */(req, res) => {
    res.render('index', /*{usuario:req.usuario}*/);
})

router.get('/login', (req, res) => {
    res.render('login', {alert:false});
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/logout', (req, res) => {
    res.render('logout',);
})
router.get('/personal', authController.isAuthenticated, (req, res) => {
     res.render('personal', {usuario:req.usuario});
})


/*router.get('/admin', authController.isAuthenticated, (req, res) => {
    res.render('admin', {usuario: 'Administrador'});
})*/

router.get('/about', /*authController.isAuthenticated,*/ (req, res) => {
    res.render('about', /*{usuario:req.usuario}*/);
})

//Router para los métodos del AuthController
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout)

//Router crud de usuarios

router.get('/admin', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('admin',{results:results});
        }
    })
})

router.get('/create', (req, res) => {
    res.render('create');
})



router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id_us = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('edit',{user:results[0]});
        }
    })
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id_us = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('delete',{user:results[0]});
        }
    })
})

router.get('/delete2/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id_us = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('../admin')
        }
    })
})

const crud = require('../controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);




//prueba
/*router.get('/', (req, res) => {
    conexion.query('SELECT* FROM usuarios', (error, results) => {
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})*/

module.exports = router;