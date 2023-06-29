import mongoose from "mongoose";

const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
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
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],

});


module.exports = mongoose.model("Tutor", TutorSchema);
