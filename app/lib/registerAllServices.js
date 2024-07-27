"use strict";

const { ServiceDatas } = require("../constants/datas");
const registerServiceHelper = require("../helper/registerServiceHelper")
exports.run = () => {
    //Register Service
    registerServiceHelper.setMethods(ServiceDatas)
    console.log("Services registered successfully")
}