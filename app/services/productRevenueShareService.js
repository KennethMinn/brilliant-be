"use strict";

const productRevenueShare = require("../models/productRevenueShare");

exports.getAllProductRevenueShare = async () => {
  try {
    let result = await productRevenueShare.find();
    return {
      success: true,
      productRevenueShare: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.getProductRevenueShareById = async (id) => {
  try {
    let result = await productRevenueShare.findById(id);
    return {
      success: true,
      productRevenueShare: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.createProductRevenueShare = async (data) => {
  try {
    console.log(data);
    let result = await productRevenueShare.create(data);
    console.log(result);
    return {
      success: true,
      productRevenueShare: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.updateProductRevenueShare = async (id, data) => {
  try {
    let result = await productRevenueShare.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      success: true,
      productRevenueShare: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.deleteProductRevenueShare = async (id) => {
  try {
    await productRevenueShare.findByIdAndDelete(id);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
