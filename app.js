const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

//Configuramos motor de plantillas
app.set('view engine', 'ejs');

//Cofiguramos ruta a la carpeta public 
app.use(express.static('public'));

//Para procesar datos desde formularios
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//variables de entorno
dotenv.config({path: './env/.env'});

//Para poder trabajar con las cookies
//app.use(cookieParser);

//LLamar al router
app.use('/', require('./routes/router'));



app.listen(3000, () => {
    console.log('SERVER UP running in http://localhost:3000');
});

//Prueba servidor
/*app.get('/', (req, res) =>{
    res.render('index');
})*/

