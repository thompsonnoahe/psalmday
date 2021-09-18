const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_data: {
    favorite_psalms: [Number],
    saved_verses: [{ verse: String, psalm: Number }],
    version: String,
    font_size: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
