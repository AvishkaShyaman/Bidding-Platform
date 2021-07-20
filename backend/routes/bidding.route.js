const express = require("express");
const router = express.Router();
const { getBidding, addBidding } = require("../controllers/bidding.controller");
const { biddingValidation } = require("../validation/bidding.validation");
const validationMiddleware = require("../validation/validation.middelware");

router.get("/biddings", getBidding);

router.post("/", validationMiddleware(biddingValidation), addBidding);

module.exports = router;