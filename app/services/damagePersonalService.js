"use strict"

const { subtractPackage, substractItemsifPackageAvailable, checkItemsAndReturn, checkPackageAndReturn } = require("../helper/checkItems")
const damageItem = require("../models/damageItem")

exports.getAllDamageItems = async (datas) => {
    try{
       let { type } = datas
       let query = { isDeleted: false }
       type ? query.type = type  : ""
       let result = await damageItem.find(query)
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

exports.createDamageItems = async (datas) => {
    try{
       // package or item
       let totalDamageItems
       let { relatedPackage, type } = datas
       type == "PersonalUse" ? datas.type = "PersonalUse" : datas.type = "Damage"
       if(relatedPackage){
        if(!await checkPackageAndReturn(datas.damageTotal, datas.relatedPackage)) return { success: false, message: "out of Package"}
        totalDamageItems = await subtractPackage(datas.relatedPackage, datas.damageTotal)
       }else{
        if(!await checkItemsAndReturn(datas.damageTotal, datas.relatedItem)) return { success: false, message: "out of Item" }
        totalDamageItems = await substractItemsifPackageAvailable(datas.relatedItem,  datas.damageTotal)
       }
       datas.totalUnitAfterDamage = totalDamageItems.totalUnit
       datas.currentQuantityAfterDamage = totalDamageItems.currentQuantity
       let result = await damageItem.create(datas)
       return result; 
    }
    catch(err){
        console.log("Error is", err.message)
    }
}

exports.getDamageItemById = async (id) => {
    try{
       let result = await damageItem.findById(id)
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

exports.updateDamageItem = async (id, datas) => {
    try{
       let result = await damageItem.findByIdAndUpdate(id, datas, { new: true })
       return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
}

exports.deleteDamageItem = async (id) => {
    try{
       let result = await damageItem.findByIdAndUpdate(id, {isDeleted: true}, { new: true })
       return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
}

