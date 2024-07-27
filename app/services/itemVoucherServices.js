"use strict"

const itemVoucher = require("../models/itemVoucher")

exports.getAllItemVoucher = async (datas) => {
       let query = { isDeleted: false }
       let result = await itemVoucher.find(query)
        return result;    
}

exports.createItemVoucher = async (datas) => {
       let result = await itemVoucher.create(datas)
       return result; 
}

exports.getItemVoucherById = async (id) => {
       let result = await itemVoucher.findById(id).populate("relatedSuperCategory relatedItemTitle")
       return result
}

exports.updateItemVoucher = async (id, datas) => {
       let result = await itemVoucher.findByIdAndUpdate(id, datas, { new: true })
       return result
}

exports.deleteItemVoucher = async (id) => {
       let result = await itemVoucher.findByIdAndUpdate(id, {isDeleted: true}, { new: true })
       return result
}

