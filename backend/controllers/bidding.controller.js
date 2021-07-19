const Vehicle = require('../models/vehicle.model');
const Bidding = require('../models/bidding.model');

const addBidding = async (req, res) => {
  try {
    const { amount, user, vehicleID } = req.body;
    
    // if ( !amount || !user || !vehicle) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'please add all the feilds',
    //   });
    // }

    const newBidding = new Bidding({
      amount,
      vehicle: vehicleID,
      user,
    });
    
    const bidding = await newBidding.save();
    
    if(bidding){

      const vehicle = await Vehicle.findById(vehicleID);

      vehicle.biddings.push(bidding._id);

      await Vehicle.findOneAndUpdate(
        { _id: vehicleID },
        { biddings: [...vehicle.biddings] }
      );

      res.status(200).json({
        success: true,
        data: { bidding },
      });
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getBidding = async (req, res) => {
  try {
    const { vehicleId } = req.query;

    if (vehicleId) {
      const bidding = await Bidding.find({vehicle: vehicleId}).sort({amount: -1});

      if(bidding) {
        res.status(200).json({
          success: true,
          data: { bidding },
        });
      }     
    } else {
      res.status(500).json({
        success: faise,
        message: 'please include vehicleId',
      });
    }  

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}

module.exports = { getBidding, addBidding };
