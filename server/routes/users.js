const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController.js');

// GET - logged-in user from database
router.get('/', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

// // POST - create new user in database
router.post('/', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
});

// // UPDATE - update preferences, user account, zip code, etc.
router.patch('/', userController.updateUser, (req, res) => {
  res.status(200).json(res.locals.updatedUser);
});

// // DELETE - delete user's account
// router.delete('/', userController.deleteAccount, (req, res) => {
//   res.status(200).json(res.locals.deleteAccount);
// });

module.exports = router;
