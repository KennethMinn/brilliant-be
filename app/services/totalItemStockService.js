"use strict"

"use strict"

const itemPackage = require("../models/itemPackage")
const items = require("../models/items")


exports.getAllStockIncludingRepackage = async (datas) => {
    try{
       let { s } = datas
       let query = { isDeleted: false }
       s ? query.relatedSuperCategory = s : ""
       let queryItems = await items.find(query).populate("relatedSuperCategory relatedItemTitle")
       let queryRepackage = await itemPackage.find({isDeleted: false}).populate({path: "itemArray",populate: {path: "item_id"}})
       let result = {}
       queryItems.map(item => {
        result[item._id] = {}
        result[item._id]["total"] = {
            name: item.name,
            code: item.code,
            fromUnit: item.fromUnit,
            toUnit: item.toUnit,
            currentQuantity: item.currentQuantity,
            totalUnit: item.totalUnit,
            sellingPrice: item.sellingPrice,
            purchasePrice: item.purchasePrice,
            deliveryPrice: item.deliveryPrice,
            // superCategoryName : item.relatedSuperCategory.name || null,
            // titleName: item.relatedItemTitle.name || null,
            totalPurchase: item.totalPurchase,
        }
        result[item._id]["item"] = item
        result[item._id]["package"] = []
        queryRepackage.map(pk=>{           
            pk.itemArray.map(pkItem=>{
                if(pkItem.item_id._id.toString()===item._id.toString()){
                    result[item._id]["total"].totalUnit += pkItem.totalQuantity
                    result[item._id]["total"].currentQuantity = Math.ceil((result[item._id]["total"].totalUnit * result[item._id]["total"].fromUnit) / result[item._id]["total"].toUnit) 
                    result[item._id]["package"].push(pk)
                }
            })
        })
       })
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

// exports.createSuperCategories = async (datas) => {
//     try{
//        let result = await superCategory.create(datas)
//        return result; 
//     }
//     catch(err){
//         console.log("Error is", err.message)
//     }
// }

// exports.getCategoriesById = async (id) => {
//     try{
//        let result = await superCategory.findById(id)
//         return result; 
//     }catch(err){
//         console.log("Error is", err.message)
//     }
    
// }

// exports.updateCategories = async (id, datas) => {
//     try{
//        let result = await superCategory.findByIdAndUpdate(id, datas, { new: true })
//        return result; 
//     }catch(err){
//         console.log("Error is", err.message)
//     }
// }

// exports.deleteSuperCategories = async (id) => {
//     try{
//        let result = await superCategory.findByIdAndUpdate(id, {isDeleted: true}, { new: true })
//        return result; 
//     }catch(err){
//         console.log("Error is", err.message)
//     }
// }

