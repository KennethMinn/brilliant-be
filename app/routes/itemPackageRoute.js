"use strict"

const { listAllData, createData, dataById, updateDataById, deleteDataById } = require("../controllers/controller");
const { checkItemsifPacakgeAvailable, checkItemsArrayifPackageAvailable } = require("../helper/checkItems");
const { catchError } = require("../lib/errorHandler");
const verifyToken = require('../lib/verifyToken');

module.exports = (app) => {

    app.route('/api/v1/item-package')
        .get(listAllData)
        .post(checkItemsArrayifPackageAvailable,catchError(createData))

        
    app.route('/api/v1/item-package/:id')
        .get(catchError(dataById)) 
        .put(catchError(updateDataById))
        .delete(catchError(deleteDataById))
};
