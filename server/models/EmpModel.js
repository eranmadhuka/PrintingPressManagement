const mongoose = require("mongoose")

//Employee form 

const EmpSchema = new mongoose.Schema({

    employeeId: String,
    employeeName: String,
    email: String,
    phone: String,
    position: String,
    department: String,
    grossSalary: Number,
    netSalary: Number

})

const EmpModel = mongoose.model("empdetails", EmpSchema)
module.exports = EmpModel