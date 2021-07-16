const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  biddings: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'biddings' }
  ]
});
module.exports = mongoose.model('vehicle', VehicleSchema);
