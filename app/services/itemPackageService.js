"use strict"

const { substractItemsifPackageAvailable, substractItemsArrayifPackageAvailable } = require("../helper/checkItems")
const itemsPackage = require("../models/itemPackage")

exports.getAllItemPackage = async (datas) => {
       let { i, c} = datas
       let query = { isDeleted: false }
       i ? query.relatedItem = i : ""
       c ? query.code= c : ""
       let result = await itemsPackage.find(query).populate("relatedItem").populate({path: "itemArray", populate:{path: "item_id"}})
        return result
}

exports.createitemsPackage = async (datas) => {
       let result = await itemsPackage.create(datas)
    //    await substractItemsifPackageAvailable(datas.relatedItem, datas.totalUnit)
       await substractItemsArrayifPackageAvailable(datas.itemArray)
       return result
}

exports.getItemPackageById = async (id) => {
       let result = await itemsPackage.findById(id).populate("relatedItem")
        return result
}

exports.updateItemPackage = async (id, datas) => {
       let result = await itemsPackage.findByIdAndUpdate(id, datas, { new: true })
       return result
}

exports.deleteItemPackage = async (id) => {
       let result = await itemsPackage.findByIdAndUpdate(id, {isDeleted: true}, { new: true })
       return result
}

