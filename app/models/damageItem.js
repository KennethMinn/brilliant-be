'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');
let DamageItem = new Schema({
  name:{
    type:String,
  },
  damageDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  damageTotal: {
    type: Number
  },
  originalTotalUnit: {
    type: Number
  },
  originalCurrentQuantity: {
    type: Number
  },
  totalUnitAfterDamage: {
    type: Number
  },
  currentQuantityAfterDamage:{
    type: Number
  },
  relatedItem: {
    type: mongoose.Types.ObjectId,
    ref: "Items"
  },
  relatedPackage: {
    type: mongoose.Types.ObjectId,
    ref: "ItemPackages"
  },
  personalUseTotalUnit: {
    type: Number
  },
  personalUseCurrentUnit: {
    type: Number
  },
  remark: {
    type: String
  },
  type: {
    type: String,
    enum: ['Damage', 'PersonalUse'],
    required: true,
    default: "Damage"
  }
});

module.exports = mongoose.model('DamageItems', DamageItem);

//Author: Kyaw Zaw Lwin
