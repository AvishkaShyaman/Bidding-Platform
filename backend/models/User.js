const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String
  },
  watchList: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'vehicle' },
  ],
});
module.exports = mongoose.model('user', UserSchema);
