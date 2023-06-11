const express = require('express');
const router = express.Router();

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

module.exports = router;