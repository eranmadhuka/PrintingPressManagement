const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  productStatus: {
    type: String,
    enum: ["Pending Delivery", "In Transit", "Delivered"],
    default: "In Transit",
  },
  deliveryDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Delivery = mongoose.model("deliveries", DeliverySchema);
