const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const { db } = require('./db/database');

db.authenticate()
    .then( () => console.log(`Connection to SQL data base has been established successfully.`))
    .catch((error) => console.error(`Unable to connect to local db:`, error));

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.use('/users', userRoutes);
//app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server listen on port ${app.get('port')}. Waiting for db connection...`)
})


/*
PENDIENTE: mejorar la dinamica de request de favs agregados ya en el get user con un join a la tabla favs.
 Quitar el req get favs by id.
 Modificar el modelo en swager tanto del post favs, como de los requests.
 Controlar el delete cascade en sql cuando se borra el producto.

 PENDIENTE:
 Cambiar el metodo put del cambio de estado por PATCH. y AGREGAR UN PUT COMPLETO DE LA ORDEN. Swagger. Mirar postman collection

 PENDIENTE: 
 Agregar id_user en el bodypostOrder swagger. Agregar ademas en el post de order el id de payment a que corresponde.

*/