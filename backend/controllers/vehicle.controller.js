const Vehicle = require('../models/vehicle.model');

const addVehicle = async (req, res) => {
  try {
    const { model, price, year, description, manufacturer } = req.body;
    
    // if ( !model || !price || !year || !description || !manufacturer) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'please add all the feilds',
    //   });
    // }

    const newVehicle = new Vehicle({
      model,
      price,
      year,
      description,
      manufacturer,
      img: '',
      biddings: [],
    });

    const vehicle = await newVehicle.save();

    res.status(200).json({
      success: true,
      data: { vehicle },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('biddings');

    res.status(200).json({
      success: true,
      data: { vehicle },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(200).json({
      success: true,
      data: { vehicles },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const sortBy = async (req, res) => {
  try {
    const sortbyvalues = req.query;

    
    let vehicles = [];
    
    if(sortbyvalues.year){
      
      vehicles = await Vehicle.find({ year: sortbyvalues.year});
    }

    res.status(200).json({
      success: true,
      data: { vehicles },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { addVehicle, getVehicle, getAllVehicle, sortBy };
