const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serviceAccount = require('./env/handicraft-app-firebase-admin.json');

const userRoute = require('./routes/user.route');
const locationRoute = require('./routes/location.route');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// env
dotenv.config();

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

//Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
