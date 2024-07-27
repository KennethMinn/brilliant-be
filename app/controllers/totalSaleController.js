"use strict"
const moment = require("moment-timezone")
const treatmentVoucher = require("../models/treatmentVoucher")
const repay = require("../models/repay")
const treatment = require("../models/treatment")

exports.totalSaleController = async(req,res) => {
    try{
        let { date, startDate, endDate, tsType, relatedBank, relatedCash, relatedDoctor, relatedNurse, relatedTherapist } = req.query
        let query = { isDeleted: false, Refund: false }
        let sales = {}
        const today = moment(date).tz('Asia/Yangon').startOf('day').format();  // Sets time to 00:00:00 of the current date
        const nextDay = moment(date).tz('Asia/Yangon').add(1, "days").startOf('day').format();  // Sets time to 00:00:00 of the next date
        const startWeek = moment(date).tz('Asia/Yangon').startOf("week").format()
        const endWeek = moment(date).tz('Asia/Yangon').endOf("week").format()
        const startMonth = moment(date).tz('Asia/Yangon').startOf("month").format()
        const endMonth = moment(date).tz('Asia/Yangon').endOf("month").format()
        // console.log("day", today, nextDay, startWeek, endWeek,startMonth, endMonth)
        // console.log("query is",query)
        let todayVoucherQuery = await treatmentVoucher.find({isDeleted: false, Refund: false, createdAt: {$gte: new Date(today), $lt: new Date(nextDay)}}).populate({
            path: "repay",
            populate:{
                path: "repayId"
            }
        })
        let weeklyVoucherQuery = await treatmentVoucher.find({isDeleted: false, Refund: false, createdAt: {$gt: new Date(startWeek), $lte: new Date(endWeek)}}).populate({
            path: "repay",
            populate:{
                path: "repayId"
            }
        })
        let monthlyVoucherQuery = await treatmentVoucher.find({isDeleted: false, Refund: false, createdAt: {$gt: new Date(startMonth), $lte: new Date(endMonth)}}).populate({
            path: "repay",
            populate:{
                path: "repayId"
            }
        })
        let todayRepay = await repay.find({date: {$gte: new Date(today), $lt: new Date(nextDay)}})
        let weeklyRepay = await repay.find({date: {$gt: new Date(startWeek), $lte: new Date(endWeek)}})
        let monthlyRepay = await repay.find({date: {$gt: new Date(startMonth), $lte: new Date(endMonth)}})
        todayVoucherQuery.map(({secondAmount, totalPaidAmount, msPaidAmount, balance})=>{
            sales["todayDebts"] = ( sales["todayDebts"] || 0) + (balance || 0) 
            sales["dailySales"] = ( sales["dailySales"] || 0) + (secondAmount || 0) + (totalPaidAmount || 0) + (msPaidAmount || 0)
        })
        weeklyVoucherQuery.map(({secondAmount, totalPaidAmount, msPaidAmount, balance})=>{
            sales["thisWeekDebts"] = ( sales["thisWeekDebts"] || 0) + (balance || 0) 
            sales["weeklySales"] = ( sales["weeklySales"]  || 0) + (secondAmount || 0) + (totalPaidAmount || 0) + (msPaidAmount || 0)
        })
        monthlyVoucherQuery.map(({secondAmount, totalPaidAmount, msPaidAmount, balance})=>{
            sales["thisMonthDebts"] = ( sales["thisMonthDebts"] || 0) + (balance || 0) 
            sales["monthlySales"] = ( sales["monthlySales"]  || 0) + (secondAmount || 0) + (totalPaidAmount || 0) + (msPaidAmount || 0)
        })
        todayRepay.map(({balance})=>{
            sales["todayRepay"] = ( sales["todayRepay"] || 0) + (balance || 0) 
        })
        weeklyRepay.map(({balance})=>{
            sales["thisWeekRepay"] = ( sales["thisWeekRepay"] || 0) + (balance || 0) 
        })
        monthlyRepay.map(({balance})=>{
            sales["thisMonthRepay"] = ( sales["thisMonthRepay"] || 0) + (balance || 0) 
        })
        console.log(sales)
        res.status(200).send({
            success: true,
            message: "Treatment Voucher",
            // voucher: todayVoucherQuery,
            data: sales
        })
    }catch(error){
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

exports.comparisonChart = async(req,res) => {
    try{
        let i = 0
        let {date} = req.query
        let voucherAmountByDate = {
            "treatment":{},
            "medicine":{},
            "treatmentByMonth": {},
            "medicineByMonth": {}
        }
        let data = {
            "treatment":{},
            "medicine":{},
            "treatmentByMonth": {},
            "medicineByMonth": {}
        }
        // start day of the month
        const startMonth = moment(date).tz('Asia/Yangon').startOf("month")
        const endMonth = moment(date).tz('Asia/Yangon').endOf("month")
        //start month of the year
        const startYear = moment(date).tz("Asia/Yangon").startOf("year")
        const endYear = moment(date).tz("Asia/Yangon").endOf("year")
        //current date
        let currentDay = startMonth.clone()
        //query data of the year
        let yearlyVoucherQuery = await treatmentVoucher.find({isDeleted: false, Refund: false, createdAt: {$gte: new Date(startYear), $lt: new Date(endYear)}}).populate({
            path: "repay",
            populate:{
                path: "repayId"
            }
        })
        //query data of the month
        let weeklyVoucherQuery = await treatmentVoucher.find({isDeleted: false, Refund: false, createdAt: {$gte: new Date(startMonth), $lt: new Date(endMonth)}}).populate({
            path: "repay",
            populate:{
                path: "repayId"
            }
        })
        // medicine sale and treatment sale according to week
       weeklyVoucherQuery.map(({tsType, createdAt, totalPaidAmount, msPaidAmount, secondAmount})=>{
            let voucherDate = Number(createdAt.toISOString().split("T")[0].split("-")[2])
            console.log("vou",voucherDate)
            if(tsType === "MS"){
                voucherAmountByDate["medicine"][voucherDate] = ( voucherAmountByDate["medicine"][voucherDate] || 0 )+ (msPaidAmount || 0) + (secondAmount || 0)
            }else if(tsType === "TSMulti" || tsType === "TS"){
              voucherAmountByDate["treatment"][voucherDate] = (voucherAmountByDate["treatment"][voucherDate] || 0) + (totalPaidAmount || 0) + (secondAmount || 0)  
            } 
        })
        // medicine sale and treatment sale according to month
        yearlyVoucherQuery.map(({tsType, createdAt, totalPaidAmount, msPaidAmount, secondAmount})=>{
            let voucherDate = Number(createdAt.toISOString().split("T")[0].split("-")[1])
            console.log("vou",voucherDate)
            if(tsType === "MS"){
                voucherAmountByDate["medicineByMonth"][voucherDate] = ( voucherAmountByDate["medicineByMonth"][voucherDate] || 0 )+ (msPaidAmount || 0) + (secondAmount || 0)
            }else if(tsType === "TSMulti" || tsType === "TS"){
              voucherAmountByDate["treatmentByMonth"][voucherDate] = (voucherAmountByDate["treatmentByMonth"][voucherDate] || 0) + (totalPaidAmount || 0) + (secondAmount || 0)  
            } 
        })
        //treatment amount By Medicine
        for(let i= 1; i <= 12; i++){
            data["treatmentByMonth"][i] = (data["treatmentByMonth"][i] || 0) + ( voucherAmountByDate["treatmentByMonth"][i] || 0)
            data["medicineByMonth"][i] = (data["medicineByMonth"][i] || 0) + ( voucherAmountByDate["medicineByMonth"][i] || 0)  
        }
        //loop till the end of the month
        while(currentDay.isBefore(endMonth)){
            switch (true) {
                case (i < 7): 
                    data["medicine"]["01-06"] = (data["medicine"]["01-06"] || 0) + ( voucherAmountByDate["medicine"][i] || 0)
                    data["treatment"]["01-06"] = (data["treatment"]["01-06"] || 0) + ( voucherAmountByDate["treatment"][i] || 0)
                break;
                case (i < 14):
                    data["medicine"]["07-13"] = (data["medicine"]["07-13"] || 0) + ( voucherAmountByDate["medicine"][i] || 0)
                    data["treatment"]["07-13"] = (data["treatment"]["07-13"] || 0) + ( voucherAmountByDate["treatment"][i] || 0)
                    break;
                case (i < 21):
                    data["medicine"]["13-20"] = (data["medicine"]["13-20"] || 0) + ( voucherAmountByDate["medicine"][i] || 0)
                    data["treatment"]["13-20"] = (data["treatment"]["13-20"] || 0) + ( voucherAmountByDate["treatment"][i] || 0)
                    break;
                case (i < 28):
                    data["medicine"]["21-27"] = (data["medicine"]["21-27"] || 0) + ( voucherAmountByDate["medicine"][i] || 0)
                    data["treatment"]["21-27"] = (data["treatment"]["21-27"] || 0) + ( voucherAmountByDate["treatment"][i] || 0)
                    break;
                default:
                    data["medicine"]["28-31"] =  (data["medicine"]["28-31"] || 0) + ( voucherAmountByDate["medicine"][i] || 0)
                    data["treatment"]["28-31"] = (data["treatment"]["28-31"] || 0)  + ( voucherAmountByDate["treatment"][i] || 0)
                    break;
            }
            i++
            currentDay.add(1,"days")
        }
        // console.log("map is ",data)
        console.log("dat",voucherAmountByDate)
        res.status(200).send({
            success: true,
            data: data,
            // yearlyVoucherQuery: yearlyVoucherQuery
            // voucher: VoucherQuery,
            // sortedVoucher: sortedVoucher
        })
    }catch(error){
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}