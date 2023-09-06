const mongoose = require('mongoose');
const postController = require('../server/controllers/postController.js');
const userController = require('../server/controllers/userController.js');
const userModel = require('../server/models/models.js');

describe('connected to database', () => {
  beforeAll(async () => {
    const MONGO_URI = require('dotenv').config().parsed.DB_URI;
    mongoose.connect(MONGO_URI, {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // sets the name of the DB that our collections are part of
      dbName: 'get-swell',
    });
  });
  //test to see if can grab data by userName
  it('retrieve post by userName', async () => {
    const userData = await userModel.User.findOne({ userName: 'Bryan' });
    expect(userData.userName).toEqual('Bryan');
  });
});

describe('postController', () => {
  describe('Get All Posts', () => {
    const mReq = { params: { id: '' } };
    const mRes = { locals: {} };
    const mNext = jest.fn();
    it('gets all posts', async () => {
      await postController.getAllPosts(mReq, mRes, mNext);
      expect(Array.isArray(mRes.locals.allPosts)).toBe(true);
      expect(typeof mRes.locals.allPosts[0]._id).toBe('object');
    });
    it('triggers next function', async () => {
      await postController.getAllPosts(mReq, mRes, mNext);
      expect(mNext).toBeCalled();
    });
  });

  describe('Create and Delete Post', () => {
    const mReq = {
      userID: { _id: '64f7cc6070af1c6e0e841fb4' },
      preference: 'Motivation',
      image: null,
      description: 'DB Test',
      hypes: 0,
      vibes: [],
    };
    const mRes = { locals: {} }; // expect
    const mNext = jest.fn();
    //  response should be the data point
    it('Creates a new post', async () => {
      await postController.createPost(mReq, mRes, mNext);
      console.log('Res: ', mRes);
      // expect();
      expect(mNext).toBeCalled();
    });
  });
});

describe('UserController', () => {
  describe('Get User', () => {
    const mRes = { locals: {} };
    const mNext = jest.fn();

    it('returns a user', async () => {
      let mReq = { query: { userName: 'Bryan' } };
      const userGamer = await userController.getUser(mReq, mRes, mNext);
      expect(mRes.locals.user.userName).toBe('Bryan');
    });
    it('next function is called', async () => {
      let mReq = { query: { userName: 'Bryan' } };
      const userGamer = await userController.getUser(mReq, mRes, mNext);
      expect(mNext).toBeCalled();
    });
    it('should error out given invalid username', async () => {
      let mReq = { query: { userName: 'brian' } };
      const userGamer = await userController.getUser(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith({
        log: `userController.getUser caught error: user does not exist`,
        message: { err: 'See server log for details' },
      });
    });
  });
});

// expect(mNext).toBeCalledWith({
//   log: `userController.getUser caught error: user does not exist`,
//   message: { err: 'See server log for details' },
// });
