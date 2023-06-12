const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//router para las vistas
router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', {usuario:req.usuario});
})

router.get('/login', (req, res) => {
    res.render('login', {alert:false});
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/personal', authController.isAuthenticated, (req, res) => {
    res.render('personal', {usuario:req.usuario});
})

router.get('/admin', authController.isAuthenticated, (req, res) => {
    res.render('admin', {usuario: 'Administrador'});
})

router.get('/about', authController.isAuthenticated, (req, res) => {
    res.render('about', {usuario:req.usuario});
})

//Router para los métodos del AuthController
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('logout', authController.logout)

//Router crud de usuarios



module.exports = router;