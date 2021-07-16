const mongoose = require('mongoose');

const BiddingSchema = mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'user' },
}, { timestamps: true });
module.exports = mongoose.model('bidding', BiddingSchema);