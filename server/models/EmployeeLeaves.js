const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
    eid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Leaves", empLeaveSchema);
