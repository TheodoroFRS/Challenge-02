import mongoose from "mongoose";
const bcrypt = require('bcrypt');

const SinglePetSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  species: {
    type: String,
    maxlength: 50,
    minlength: 1,
    required: true
  },
  carry: {
    type: String,
    enum: ['p', 'm', 'g'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  }
});

 
const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  password: { type: String, required: true, minlength: 6 },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  zip_code: {
    type: Number,
    required: true
  },
  pets: [SinglePetSchema],

});


TutorSchema.pre("save", async function () {
  //   // console.log(this.modifiedPaths());
  //   // console.log(this.isModified('name'));
  //   if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

TutorSchema.methods.comparePassword = async function (canditatePassword: any) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Tutor", TutorSchema);
