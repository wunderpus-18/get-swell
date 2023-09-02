const { User } = require('../models/models.js');

const userController = {};

// GET - single user with all data except password
userController.getUser = async (req, res, next) => {
  const { userName } = req.query;
  try {
    const fetchedUser = await User.findOne({ userName });
    console.log(
      'userController.getUser successfully fetched user:',
      fetchedUser,
    );
    res.locals.user = fetchedUser;
    return next();
  } catch (error) {
    return next({
      log: `userController.getUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

// POST - add new user
// TO DO - figure out why request body is not coming through
userController.createUser = async (req, res, next) => {
  const { userName } = req.query;
  console.log('entered createUser with user:', userName);
  console.log('req.body:', req.body);
  //   const { password, email, preferences, profilePic, zipCode } = req.body;
  try {
    // const newUser = await User.create({
    //   userName,
    //   password,
    //   email,
    //   preferences,
    //   profilePic,
    //   zipCode,
    // });
    // res.locals.newUser = newUser;
    // console.log(newUser);
    return next();
  } catch (error) {
    return next({
      log: `userController.createUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

userController.updateUser = async (req, res, next) => {
  const { userName } = req.query;
  console.log('entered updateUser with user:', userName);
  console.log(req);
  try {
    return next();
  } catch (error) {
    return next({
      log: `userController.updateUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

// userController.deleteUser = async (req, res, next) => {
//   try {
//     return next();
//   } catch (error) {
//     return next({
//       log: `userController.deleteUser caught error: ${error}`,
//       message: { err: 'See server log for details' },
//     });
//   }
// };

module.exports = userController;
