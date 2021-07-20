const User = require('../models/user.model');

const getUser = async (req, res) => {
  try {
    const userName = req.params.id;
    if (userName) {
      const user = await User.findOne({ userName });

      res.status(200).json({
        success: true,
        data: { user },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'name is empty',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { model, price, year, description, manufacturer } = req.body;

    // if ( !model || !price || !year || !description || !manufacturer) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'please add all the feilds',
    //   });
    // }

    const newUser = new User({
      userName: 'nuwan',
      email: 'nuwan@gmail.com',
      watchList: ['60f12c8057330b3fc4057c18', '60f13ad2d24eae0bf0244a84'],
    });

    const user = await newUser.save();

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const addItemToWatchList = async (req, res) => {
  try {
    const { vehicleId, userID } = req.body;

    const user = await User.findById(userID);

    if (user) {
      user.watchList.push(vehicleId);

      await User.findOneAndUpdate(
        { _id: userID },
        { watchList: [...user.watchList] }
      );

      res.status(200).json({
        success: true,
        data: { user },
      });
    } else {
      res.status(404).json({
        success: true,
        message: 'User not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const removeItemFromWatchList = async (req, res) => {
  try {
    const { vehicleId, userID } = req.body;
    console.log('befor user');

    const user = await User.findById(userID);

    console.log('after user');
    if (user) {
      console.log('befor filter', user.watchList.length);

      const updatedWatchList = user.watchList.filter(
        (itemId) => vehicleId != itemId
      );

      console.log('after filter ', updatedWatchList.length);

      const newUser = await User.findOneAndUpdate(
        { _id: userID },
        { watchList: updatedWatchList }
      );

      console.log('after Updated ', newUser.watchList.length);

      res.status(200).json({
        success: true,
        data: { user, newUser },
      });
    } else {
      res.status(404).json({
        success: true,
        message: 'User not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserWatchList = async (req, res) => {
  try {
    const { userID } = req.query;
    console.log('req.query', userID);
    const user = await User.findById(userID).populate('watchList');

    console.log('user', user);

    res.status(200).json({
      success: true,
      data: { watchList: user.watchList },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getUser,
  addItemToWatchList,
  removeItemFromWatchList,
  getUserWatchList,
  addUser,
};
