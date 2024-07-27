"use strict"

const items = require("../models/items")

exports.getAllItems = async (datas) => {
    try{
       let { s, c} = datas
       let query = { isDeleted: false }
       s ? query.relatedSuperCategory = s : ""
       c ? query.code= c : ""
       let result = await items.find(query).populate("relatedSuperCategory relatedItemTitle")
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

exports.createItems = async (datas) => {
    try{
       let result = await items.create(datas)
       return result; 
    }
    catch(err){
        console.log("Error is", err.message)
    }
}

exports.getItemById = async (id) => {
    try{
       let result = await items.findById(id).populate("relatedSuperCategory relatedItemTitle")
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

exports.updateItem = async (id, datas) => {
    try{
       let result = await items.findByIdAndUpdate(id, datas, { new: true })
       return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
}

exports.deleteItem = async (id) => {
    try{
       let result = await items.findByIdAndUpdate(id, {isDeleted: true}, { new: true })
       return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
}

