const express = require('express');
const morgan = require('morgan');
const axios = require('axios').default;
const { auth } = require('express-openid-connect');
const aws = require('aws-sdk');
const User = require('./models/userModel');
const path = require('path');
const app = express();

aws.config.region = 'us-west-1';

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: 'http://localhost:8000',
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuerBaseURL: 'https://psalmday.us.auth0.com',
  })
);

app.use(express.static(path.join(__dirname, '..', 'build')));

const getCredentials = async (req, res, next) => {
  try {
    const { data } = await axios.post(
      'https://psalmday.us.auth0.com/oauth/token',
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: 'https://psalmday.us.auth0.com/api/v2/',
        grant_type: 'client_credentials',
      }
    );
    req.credentials = data;

    next();
  } catch (error) {
    next(
      `Something went wrong when attempting to retrieve Auth0 credentials. ${error.response.data.error_description}`
    );
  }
};

// Get Credentials middleware
app.use(getCredentials);

// Get a user
app.get('/api/v1/users/:id', async (req, res) => {
  if (req.params.id === 'undefined') {
    res.status(404).json({});
  }
  // Get user from Auth0
  const { token_type, access_token } = req.credentials;
  try {
    const { data } = await axios.get(
      `https://psalmday.us.auth0.com/api/v2/users/${req.params.id}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );
    // Get user's data from DB
    const user = await User.findById(req.params.id.split('|')[1]).exec();
    // Attach it to the payload
    data.user_data = user.user_data;
    res.send(data);
  } catch (error) {
    res.status(500);
  }
});

// Update a user
app.patch('/api/v1/users/:id', async (req, res) => {
  if (!req.params.id) return;
  const { token_type, access_token } = req.credentials;
  try {
    const { data } = await axios.patch(
      `https://psalmday.us.auth0.com/api/v2/users/${req.params.id}`,
      {
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        picture: req.body.picture,
        user_metadata: req.body.user_metadata,
        connection: 'Psalmday-DB',
      },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    // Attach data to payload
    data.user_data = req.body.user_data;

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

// Set a user's user data
app.patch('/api/v1/users/:id/userData', async (req, res) => {
  const id = req.params.id.split('|')[1];

  const { favorite_psalms, saved_verses, font_size, version } =
    req.body.user_data;

  const user = await User.findById(id);

  // Update the user in the DB
  await User.findByIdAndUpdate(id, {
    user_data: {
      favorite_psalms: favorite_psalms || user.user_data.favorite_psalms,
      saved_verses: saved_verses || user.user_data.saved_verses,
      version: version || user.user_data.version,
      font_size: font_size || user.user_data.font_size,
    },
  });
  res.json({
    user_data: {
      favorite_psalms: favorite_psalms || user.user_data.favorite_psalms,
      saved_verses: saved_verses || user.user_data.saved_verses,
      version: version || user.user_data.version,
      font_size: font_size || user.user_data.font_size,
    },
  });
});

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = app;
