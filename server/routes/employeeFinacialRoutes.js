const express = require("express");
const router = express.Router();
// const EmpFinancialModel = require("../models/EmpFinancialModel");

const EmpFinancialModel = require("../models/Employee");

//read all data
router.get("/getEmployeeDetails", async (req, res) => {
    try {
        const employee = await EmpFinancialModel.find({});
        return res.json(employee);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
});

//read deta by ID

router.get("/getEmployeeDetails/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const empEntry = await EmpFinancialModel.findById(id);

        if (!empEntry) {
            return res.status(404).json({ message: "Entry no dfound" });
        }

        return res.json(empEntry);
    } catch (error) {
        console.error("Error fetching entry:", error);
        return res.status(500).json({ message: "failed to fetch entry" });
    }
});

//update entry
router.get("/updateEmployeeDetails/:", (req, res) => {
    const id = req.params.id;
    EmpFinancialModel.findByIdAndUpdate(id, {
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        grossSalary: req.body.grossSalary,
        netSalary: req.body.netSalary,
    })
        .then((employee) => res.json(employee))
        .catch((err) => res.json(err));
});

module.exports = router;