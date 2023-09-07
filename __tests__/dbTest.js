const mongoose = require('mongoose');
const postController = require('../server/controllers/postController.js');
const userController = require('../server/controllers/userController.js');
const userModel = require('../server/models/models.js');
const Server = require('webpack-dev-server');

let testUserId = '';

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

/* 
  Post Controller Tests. Get, Create, Update, Delete
*/

let testActivitiesId;

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

  describe('Create Post and Delete Post', () => {
    const mReq = {
      body: {
        userID: { _id: '64f7cc6070af1c6e0e841fb4' },
        preference: 'Motivation',
        image: null,
        description: 'DB Test',
        hypes: 0,
        vibes: [],
      },
    };
    const mRes = { locals: {} }; // expect
    const mNext = jest.fn();
    //  response should be the data point
    it('Creates a new post', async () => {
      await postController.createPost(mReq, mRes, mNext);
      console.log('Res: ', mRes.locals.newPost);
      // res.locals has a _Id prop
      const id = mRes.locals.newPost._id.toString();
      testActivitiesId = id;
      expect(mRes.locals.newPost.description).toBe('DB Test');
    });
    it('next function is called', () => {
      expect(mNext).toBeCalled();
    });
    it('should error out if passed invalid data', async () => {
      try {
        const errorTest = await postController.createPost({}, mRes, mNext);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
    // delete
    it('Deletes Post', async () => {
      console.log('test act Id', testActivitiesId);
      let mReq = { params: { id: testActivitiesId } };
      const mRes = { locals: {} };
      const mNext = jest.fn();
      await postController.deletePost(mReq, mRes, mNext);
      expect(mRes.locals.deletedPost.description).toBe('DB Test');
    });
  });

  // console.log('before delete post', testActivitiesId);
  // describe('Updates Post',)
});

/* 
  User Controller Tests. Get, Create, Update, Delete
*/
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
    it('should throw error when user is invalid', async () => {
      let mReq = {};
      try {
        const userGamer = await userController.getUser(mReq, mRes, mNext);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('Successfully creates a new user', () => {
    const mRes = { locals: {} };
    const mNext = jest.fn();
    it('Creates a new user', async () => {
      let mReq = {
        query: {
          userName: 'choe',
        },
        body: {
          password: 'bryan',
          email: 'choe@bryan.com',
          preferences: {
            Motivation: true,
            Milestones: false,
            Mindfulness: false,
          },
          zipCode: 92821,
        },
      };
      const newUser = await userController.createUser(mReq, mRes, mNext);
      console.log('NEW USER', newUser);
      expect(mRes.locals.newUser.userName).toBe('choe');
    });
    it('Next function is called', async () => {
      let mReq = {
        query: {
          userName: 'choe',
        },
        body: {
          password: 'bryan',
          email: 'choe@bryan.com',
          preferences: {
            Motivation: true,
            Milestones: false,
            Mindfulness: false,
          },
          zipCode: 92821,
        },
      };
      const newUser = await userController.createUser(mReq, mRes, mNext);
      expect(mNext).toBeCalled();
    });

    it('Should throw an error when a user is not created properly', async () => {
      let mReq = {};
      try {
        const newUser = await userController.createUser(mReq, mRes, mNext);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('Should delete a user', () => {
    const mRes = { locals: {} };
    const mNext = jest.fn();
    it('Should delete a user', async () => {
      let mReq = {
        query: {
          userName: 'kobe',
        },
        body: {
          password: 'bryant',
          email: 'choe@bryan.com',
          preferences: {
            Motivation: true,
            Milestones: false,
            Mindfulness: false,
          },
          zipCode: 92821,
        },
      };
      const newUser = await userController.createUser(mReq, mRes, mNext);
      console.log('newUser: ', mRes.locals.newUser);
      mReq = { query: { userName: mRes.locals.newUser.userName } };
      const deletedUser = await userController.deleteUser(mReq, mRes, mNext);
      expect(mRes.locals.deletedUser.userName).toBe('kobe'); // status code indicates success and no content
      mReq = { query: { userName: 'kobe' } };
      try {
        const getUser = await userController.getUser(mReq, mRes, mNext);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
      // getUser should return an error when searching for 'Kobe'.
    });
    it('Should return an error is user does not exist', async () => {
      let mReq = { query: { userName: 'kobe' } };
      try {
        const getUser = await userController.deleteUser(mReq, mRes, mNext);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
