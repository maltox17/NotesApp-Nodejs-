require('dotenv').config(); //variables de entorno
require('./database');


//Arrancamos el servidor
//ejemplo
const app = require('./server');


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    
})