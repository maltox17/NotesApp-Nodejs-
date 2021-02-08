//Almacenamos Express

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan =require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Inicializaciones
const app = express();
require('./config/passport');




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
app.use(session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Variables Globales, toda la aplicacion puede acceder a ellas
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})





//Routes

app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/user.routes'))

//Archivos Estaticos, los archivos que se pueden acceder sin autenticacion, estan en la carpeta public
app.use(express.static(path.join(__dirname, 'public'))) 


module.exports = app;