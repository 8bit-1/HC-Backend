const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user.route');
const locationRoute = require('./routes/location.route');
const productRoute = require('./routes/product.route');
// SETTINGS
app.set('port', process.env.PORT || 6000);

// MIDDLEWARES
app.use(cors());
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

// ROUTES
app.use('/user', userRoute);
app.use('/app', locationRoute);
app.use('/product', productRoute);

//Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
