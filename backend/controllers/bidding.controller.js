const Vehicle = require('../models/vehicle.model');
const Bidding = require('../models/bidding.model');

const addBidding = async (req, res) => {
  try {
    console.log('in add bidding');
    const { amount, user, vehicleID } = req.body;
    
    console.log('after req bidding',amount, user, vehicleID);

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
    
    console.log('after new bidding',bidding);
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
    const { vehicleId } = req.quary;

    if (vehicleId) {
      const bidding = await User.findOne({ vehicle: vehicleId });

      if(bidding) {
        res.status(200).json({
          success: true,
          data: { user },
        });
      }      
    } 

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}

module.exports = { getBidding, addBidding };
