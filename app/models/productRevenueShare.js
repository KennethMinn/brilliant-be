"use strict";

const mongoose = require("mongoose");
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let ProductRevenueShare = new Schema({
  sharePercent: {
    type: Number,
    required: true,
  },
  relatedShareHolder: {
    type: Schema.Types.ObjectId,
    ref: "ShareHolder",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProductRevenueShare", ProductRevenueShare);
