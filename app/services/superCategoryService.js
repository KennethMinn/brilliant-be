"use strict"

const superCategory = require("../models/superCategory")

exports.getAllSuperCategories = async (datas) => {
    try{
       let query = { isDeleted: false }
       let result = await superCategory.find(query)
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

exports.createSuperCategories = async (datas) => {
    try{
       let result = await superCategory.create(datas)
       return result; 
    }
    catch(err){
        console.log("Error is", err.message)
    }
}

exports.getCategoriesById = async (id) => {
    try{
       let result = await superCategory.findById(id)
        return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
    
}

exports.updateCategories = async (id, datas) => {
    try{
       let result = await superCategory.findByIdAndUpdate(id, datas, { new: true })
       return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
}

exports.deleteSuperCategories = async (id) => {
    try{
       let result = await superCategory.findByIdAndUpdate(id, {isDeleted: true}, { new: true })
       return result; 
    }catch(err){
        console.log("Error is", err.message)
    }
}

