const express = require("express");
const router = express.Router();
const { addVehicle, getVehicle, getAllVehicle, sortBy } = require("../controllers/vehicle.controller");
// const { productValidation } = require("../validations/product.validation");
// const validationMiddleware = require("../middleware/validation.middleware");

router.get("/", getAllVehicle);

router.get("/sortBy", sortBy);

router.get("/:id", getVehicle);

router.post("/", addVehicle);


// router.put("/addBidding", addBidding);

module.exports = router;
