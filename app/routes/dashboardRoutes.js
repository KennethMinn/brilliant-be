const { listAllPatients } = require("../controllers/patientController")
const { totalSaleController, comparisonChart } = require("../controllers/totalSaleController")
const { listAllTreatmentVouchers } = require("../controllers/treatmentVoucherController")
const { catchError } = require("../lib/errorHandler")
const verifyToken = require("../lib/verifyToken")

module.exports = (app)=>{
    app.route("/api/dashboard/total-income")
       .get(catchError(totalSaleController))

    app.route("/api/dashboard/income/chart/comparison")
        .get(catchError(comparisonChart))
    
    app.route("/api/dashboard/patient/total")
        .get(listAllPatients) 
        
    app.route("/api/dashboard/treatment-voucher/total")
        .get(listAllTreatmentVouchers)
}