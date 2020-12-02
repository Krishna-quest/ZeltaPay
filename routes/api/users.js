const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// Load User model
const User = require('../../models/users');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ telePhoneNumber: req.body.telePhoneNumber }).then(user => {
    if (user) {
      errors.telePhoneNumber = 'telePhoneNumber already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        placeOfBirth: req.body.placeOfBirth,
        telePhoneNumber: req.body.telePhoneNumber,
        nationality: req.body.nationality,
        nationalIdNumber: req.body.nationalIdNumber,
        bankVerificationNumber: req.body.bankVerificationNumber,
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
        password: req.body.password,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        postalCode: req.body.postalCode
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const telePhoneNumber = req.body.telePhoneNumber;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by telePhoneNumber
  User.findOne({ telePhoneNumber }).then(user => {
    // Check for user
    if (!user) {
      errors.telePhoneNumber = 'User not found';
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, telePhoneNumber: user.telePhoneNumber, email: user.email }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
