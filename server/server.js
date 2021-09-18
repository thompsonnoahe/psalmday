require('dotenv').config({ path: './.env' });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.MONGO_CONN_STRING.replace(
  '<password>',
  process.env.MONGO_DB_PASSWORD
);

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await mongoose.connect(DB);
  } catch (error) {
    console.error(error);
  }
  console.log(`Psalmday services running on port ${port}...`);
});
