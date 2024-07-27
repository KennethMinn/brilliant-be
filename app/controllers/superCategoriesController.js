"use strict"

exports.listAllData = async (req,res) => {
    let datas = await getAllPoints()
    res.status(200).send({success: true, message: "Get All SuperCategories", data: datas})
}

exports.createData = async (req,res) => {
    let datas = await createPoints(req.body)
    res.status(200).send({success: true, message: "Create SuperCategories", data: datas})
}

exports.dataById = async (req,res) => {
    let datas = await getPoints(req.params.id)
    res.status(200).send({success: true, message: "Get SuperCategories By Id", data: datas})
}

exports.updateDataById = async (req,res) => {
    let datas = await updatePoints(req.params.id, req.body)
    res.status(200).send({success: true, message: "Update SuperCategories By Id", data: datas})
}

exports.deleteDataById = async (req,res) => {
    let datas = await updatePoints(req.params.id, req.body)
    res.status(200).send({success: true, message: "delete SuperCategories By Id", data: datas})
}