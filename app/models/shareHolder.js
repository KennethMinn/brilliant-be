"use strict";

const mongoose = require("mongoose");
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let ShareHolderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  position: {
    type: String,
  },
  nrc_number: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  avg_share_percent: {
    type: Number,
    required: true,
  },
  max_share_percent: {
    type: Number,
    required: true,
  },
  min_share_percent: {
    type: Number,
    required: true,
  },
  overall_business_share: {
    type: Number,
    required: true,
  },
  allowed_withdraw_date: {
    type: Date,
    required: true,
  },
  allowed_withdraw_frequency: {
    type: Number,
    required: true,
  },
  allowed_max_withdraw_per_amount: {
    type: Number,
    required: true,
  },
  allowed_max_withdraw_total_amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ShareHolder", ShareHolderSchema);
