const { ObjectId } = require("mongodb")
const accessoryItem = require("../models/accessoryItem")
const damageItem = require("../models/damageItem")
const medicineItem = require("../models/medicineItem")
const procedureItem = require("../models/procedureItem")

exports.createDamageList = async (req,res) => {
    try{
        let data = req.body
        let { purchaseHistoryId, damageCurrentQty } = data
        // related medicine item to subtract from medicine
        if(data.relatedMedicineItem){
            let currentQty = 0
            let itemData  = await medicineItem.findById(data.relatedMedicineItem)
            itemData.purchaseHistory.map(item=> {
                if(item._id.equals(purchaseHistoryId)){
                    item["currentQuantity"] = item["currentQuantity"] - damageCurrentQty
                    item["totalUnit"] = (Number(itemData.fromUnit) / Number(itemData.toUnit)) * item["currentQuantity"]
                    currentQty += item["currentQuantity"]
                    return item
                }
                currentQty += item["currentQuantity"]
                return item
            })
            itemData.currentQuantity = currentQty
            itemData.totalUnit = (Number(itemData.fromUnit) / Number(itemData.toUnit)) * currentQty
            data["damageTotalUnit"] = itemData.totalUnit
            await itemData.save()
        }
        else if(data.relatedProcedureItem){
            let currentQty = 0
            let itemData  = await procedureItem.findById(data.relatedProcedureItem)
            itemData.purchaseHistory.map(item=> {
                if(item._id.equals(purchaseHistoryId)){
                    item["currentQuantity"] = item["currentQuantity"] - damageCurrentQty
                    item["totalUnit"] = (Number(itemData.fromUnit) / Number(itemData.toUnit)) * item["currentQuantity"]
                    currentQty += item["currentQuantity"]
                    return item
                }
                currentQty += item["currentQuantity"]
                return item
            })
            itemData.currentQuantity = currentQty
            itemData.totalUnit = (Number(itemData.fromUnit) / Number(itemData.toUnit)) * currentQty
            data["damageTotalUnit"] = itemData.totalUnit
            await itemData.save()
        }
        else if(data.relatedAccessoryItem){
            let currentQty = 0
            let itemData  = await accessoryItem.findById(data.relatedAccessoryItem)
            itemData.purchaseHistory.map(item=> {
                if(item._id.equals(purchaseHistoryId)){
                    item["currentQuantity"] = item["currentQuantity"] - damageCurrentQty
                    item["totalUnit"] = (Number(itemData.fromUnit) / Number(itemData.toUnit)) * item["currentQuantity"]
                    currentQty += item["currentQuantity"]
                    return item
                }
                currentQty += item["currentQuantity"]
                return item
            })
            itemData.currentQuantity = currentQty
            itemData.totalUnit = (Number(itemData.fromUnit) / Number(itemData.toUnit)) * currentQty
            data["damageTotalUnit"] = itemData.totalUnit
            await itemData.save()
        }
        let result = await damageItem.create(data)
        res.status(200).send({
            success: true,
            message: "Damage Item created successfully",
            data: result
        })
    }catch(error){
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

exports.listAllDamageItem = async (req,res) => {
    try{
        let {  name, damageDate, relatedAccessoryItem, relatedMedicineItem, relatedProcedureItem } = req.query
        let query = { isDeleted: false }
        let date = new Date(damageDate)
        let nextDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1,
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        )
        name ? query["name"] = name : ""
        damageDate ? query["damageDate"] = { $gte: new Date(date), $lt: new Date(nextDate)} : ""
        relatedAccessoryItem ? query["relatedAccessoryItem"] = ObjectId(relatedAccessoryItem) : ""
        relatedMedicineItem ? query["relatedMedicineItem"] = ObjectId(relatedMedicineItem) : ""
        relatedProcedureItem ? query["relatedProcedureItem"] = ObjectId(relatedProcedureItem) : ""
        let list = await damageItem.find(query).populate("relatedAccessoryItem relatedMedicineItem relatedProcedureItem")
        res.status(200).send({
            success: true,
            message: "List of Damage Item",
            data: list
        })

    }catch(error){
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}