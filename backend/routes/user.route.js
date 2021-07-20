const express = require("express");
const router = express.Router();
const { getUser, addItemToWatchList, removeItemFromWatchList, getUserWatchList,addUser } = require("../controllers/user.controller");


// router.get("/", getUser);

router.get("/watchList", getUserWatchList);

router.get("/:id", getUser);

router.post("/", addUser);

router.put("/watchList", addItemToWatchList);

router.delete("/watchList", removeItemFromWatchList);

// router.put("/addBidding", addBidding);

module.exports = router;