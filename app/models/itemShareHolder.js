"use strict";

const mongoose = require("mongoose");
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let ItemShareHolderSchema = new Schema({
  relatedItem: {
    type: Schema.Types.ObjectId,
    ref: "Items",
  },
  relatedShareHolder: {
    type: Schema.Types.ObjectId,
    ref: "ShareHolder",
  },
  percent: {
    type: Number,
  },
});

module.exports = mongoose.model("ItemShareHolder", ItemShareHolderSchema);
