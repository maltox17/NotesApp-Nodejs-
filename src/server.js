//Almacenamos Express

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan =require('morgan');
const methodOverride = require('method-override');


//Inicializaciones
const app = express();




//Configuraciones, lo que yo quiero que haga express con los modulos

app.set('port', process.env.PORT || 4000); //le indico el puerto
app.set('views', path.join(__dirname, 'views')) //indicamos carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');



//Middlewares, lo que se ejecutara antes de nada
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //le dice al servidor que cada vez que llegan datos al servidor, los convertimos a json
app.use(methodOverride('_method'));


//Variables Globales

//Routes

app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));

//Archivos Estaticos, los archivos que se pueden acceder sin autenticacion, estan en la carpeta public
app.use(express.static(path.join(__dirname, 'public'))) 


module.exports = app;