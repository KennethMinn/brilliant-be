const itemPackage = require("../models/itemPackage")
const items = require("../models/items")

exports.checkItemsifPacakgeAvailable = async (req,res, next) => {
    const itemData = await items.findById(req.body.relatedItem).exec()
    const Values = itemData.totalUnit - req.body.totalUnit
    if(Values < 0) return res.status(200).send({success:false, message: "You don't have enough items to create packages", data: null})
    next()
}

exports.checkItemsAndReturn = async(total,id) => {
    const itemData = await items.findById(id).exec()
    const Values = itemData.totalUnit - total
    if(Values < 0) return false
    return true
}

exports.checkPackageAndReturn = async(total,id) => {
    const itemData = await itemPackage.findById(id).exec()
    const Values = itemData.totalUnit - total
    if(Values < 0) return false
    return true
}

exports.checkPackageifPacakgeAvailable = async (req,res, next) => {
    const itemData = await items.findById(req.body.relatedPackage).exec()
    const Values = itemData.totalUnit - req.body.totalUnit
    if(Values < 0) return res.status(200).send({success:false, message: "You don't have enough items to create packages", data: null})
    next()
}

exports.checkItemsArrayifPackageAvailable = async (req,res,next) => {
    // const parseJson = JSON.parse(req.body.itemArray)
    // console.log("itemArr", parseJson)
    if(req.body.itemArray && req.body.itemArray.length !=0){
        for(let i=0; i<req.body.itemArray.length; i++){
            const itemData = await items.findById(req.body.itemArray[i].item_id).exec()
            const Values = itemData.totalUnit - req.body.itemArray[i].totalQuantity
            console.log("item is ", i, Values)
            if(Values < 0) return res.status(200).send({success:false, message: "You don't have enough items to create packages", data: null})
        }
        next()
    }
    else return res.status(200).send({success:false, message: "Package Item Array is required", data: null})
}

exports.substractItemsifPackageAvailable = async (id, total) => {
    try {
        // Find the item asynchronously
        let item = await items.findOne({_id: id});

        // Calculate new values
        item.totalUnit -= total;
        item.currentQuantity = Math.ceil(item.totalUnit * item.fromUnit / item.toUnit);

        // Save the updated item asynchronously
        await item.save();

        // Log and return the updated values
        console.log("Updated item:", item.totalUnit, item.currentQuantity);
        return { totalUnit: item.totalUnit, currentQuantity: item.currentQuantity };
    } catch (e) {
        console.log("Error:", e.message);
        throw e; // Rethrow the error to handle it elsewhere if needed
    }
}

exports.subtractPackage = async (id, total) => {
    try {
        // Find the item asynchronously
        let item = await itemPackage.findOne({_id: id});

        // Calculate new values
        item.totalUnit -= total;
        item.currentQuantity = Math.ceil(item.totalUnit * item.fromUnit / item.toUnit);

        // Save the updated item asynchronously
        await item.save();

        // Log and return the updated values
        console.log("Updated item:", item.totalUnit, item.currentQuantity);
        return { totalUnit: item.totalUnit, currentQuantity: item.currentQuantity };
    }catch(e){
        console.log("Error is ", e.message)
    }
}

exports.substractItemsArrayifPackageAvailable = async (itemArray) => {
    try{
        for(let i=0; i<itemArray.length; i++){
            items.findOne({_id:itemArray[i].item_id}).then(function(item){
                item.totalUnit = item.totalUnit - itemArray[i].totalQuantity
                item.currentQuantity = Math.ceil(item.totalUnit * item.fromUnit/ item.toUnit)
                item.save()
            })
        }
    }catch(e){
        console.log("Error is ", e.message)
    }
}

exports.addItemsArrayifPackageAvailable = async (itemArray) => {
    try{
        for(let i=0; i<itemArray.length; i++){
            items.findOne({_id:itemArray[i].item_id}).then(function(item){
                item.totalUnit = item.totalUnit + itemArray[i].totalQuantity
                item.currentQuantity = Math.ceil(item.totalUnit * item.fromUnit/ item.toUnit)
                item.save()
            })
        }
    }catch(e){
        console.log("Error is ", e.message)
    }
}