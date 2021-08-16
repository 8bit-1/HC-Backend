const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const admin = require('firebase-admin');
const serviceAccount = require('./env/handicraft-app-firebase-admin.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userRoute = require('./routes/user.route');
const locationRoute = require('./routes/location.route');

const productRoute = require('./routes/product.route');
const coinRoute = require('./routes/coin.route');

const categoryRoute = require('./routes/category.route');
const qualificationRoute = require('./routes/qualification.route');

const comentaryRoute = require('./routes/comentary.route');
const reportRoute = require('./routes/report.route');

const complaintRoute = require('./routes/complaint.route');
const landingRoute = require('./routes/landing.route');
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
app.use('/app', coinRoute);
app.use('/app', categoryRoute);
app.use('/quali', qualificationRoute);
app.use('/comment', comentaryRoute);
app.use('/report', reportRoute);

app.use('/complaint', complaintRoute);
app.use('/landing', landingRoute);
//Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
