'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


let ItemPackageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String
  },
  fromUnit: {
    type: Number,
    required: true
  },
  toUnit: {
    type: Number,
    required: true
  },
  totalUnit: {
    type: Number,
    required: true
  },
  currentQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sellingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  purchasePrice: {
    type: Number,
    required: true,
    default: 0
  },
  deliveryPrice: {
    type: Number,
    default: 0
  },
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items'
  },
  itemArray: [{
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Items'
    },
    totalQuantity: Number,
    originalCurrentQuantity: Number,
    originalFromUnit: Number,
    originalToUnit: Number,
    originalTotalUnit: Number
  }],
  relatedItemTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemTitles"
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('ItemPackages', ItemPackageSchema);

//Author: Oakar Kyaw
