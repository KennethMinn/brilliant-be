'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;


let SuperCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('SuperCategories', SuperCategoriesSchema);

//Author: Oakar Kyaw
