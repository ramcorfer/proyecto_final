const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//router para las vistas
router.get('/', (req, res) => {
    res.render('index');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/personal', (req, res) => {
    res.render('personal');
})

router.get('/admin', (req, res) => {
    res.render('admin');
})

router.get('/about', (req, res) => {
    res.render('about');
})

//Router para los métodos del AbortController
router.post('/register',authController.register)

module.exports = router;