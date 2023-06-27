import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Pet", PetSchema);
