const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  placeOfBirth: {
    type: String,
    required: true
  },
  telePhoneNumber: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  nationalIdNumber: {
    type: String,
    required: true
  },
  bankVerificationNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String
  },
  lattitude: {
    type: String
  },
  longitude: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
