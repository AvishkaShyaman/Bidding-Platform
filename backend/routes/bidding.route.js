const express = require("express");
const router = express.Router();
const { getBidding, addBidding } = require("../controllers/bidding.controller");
// const { productValidation } = require("../validations/product.validation");
// const validationMiddleware = require("../middleware/validation.middleware");

router.get("/biddings", getBidding);

router.post("/", addBidding);

module.exports = router;