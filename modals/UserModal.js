const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default:"number"
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  login:{
    type: String,
    required:true,
    unique:true
  },
  status:{
    type:String,
    required:true,
    default:"student"
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isTeacher: {
    type: String,
    required: true,
    default: false,
  },
  isAllowed: {
    type: Boolean,
    required: true,
    default: false,
  },
  
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

