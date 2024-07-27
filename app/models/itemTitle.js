'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;


let ItemTitleSchema = new Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  updatedAt: {
    type: Date
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  relatedCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SuperCategories'
  },
  relatedBrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brands'
  },
  relatedSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategories'
  },
  relatedBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branches'
  },
});

module.exports = mongoose.model('ItemTitles', ItemTitleSchema);

//Author: Oakar Kyaw
