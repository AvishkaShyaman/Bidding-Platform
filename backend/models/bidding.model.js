const mongoose = require('mongoose');

const BiddingSchema = mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  vehicle: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'vehicle' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
}, { timestamps: true });
module.exports = mongoose.model('bidding', BiddingSchema);