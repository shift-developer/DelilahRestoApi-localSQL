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
app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server listen on port ${app.get('port')}. Waiting for db connection...`)
})
