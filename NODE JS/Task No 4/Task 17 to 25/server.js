const express = require('express');
const app = express();

app.use(express.json());

// Middleware
const logger = require('./middleware/logger');
app.use(logger);

// Import all routes
const user17 = require('./routes/userRoutes17');
const user18 = require('./routes/userRoutes18');
const admin19 = require('./routes/adminRoutes19');
const product20 = require('./routes/productRoutes20');
const order20 = require('./routes/orderRoutes20');
const order21 = require('./routes/orderRoutes21');
const admin22 = require('./routes/adminRoutes22');
const product23 = require('./routes/productRoutes23');

// Use routes
app.use('/task17/users', user17);
app.use('/task18/users', user18);
app.use('/task19/admin', admin19);
app.use('/task20/products', product20);
app.use('/task20/orders', order20);
app.use('/task21/orders', order21);
app.use('/task22/admin', admin22);
app.use('/task23/products', product23);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});