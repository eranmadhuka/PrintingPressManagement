import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  address: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  updated: { type: Date, default: Date.now },
  feedback: [{ type: String }],
  notification: [{ type: String }],
  filename: [{ type: String }],
  role: { type: String },
});

const usermodel = mongoose.model("users", userschema);

export { usermodel as User };
