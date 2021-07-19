const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/User.route');
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

//Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
