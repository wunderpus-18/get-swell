const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

const MONGO_URI = dotenv.config().parsed.DB_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'get-swell',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  preferences: {
    type: Array,
    default: ['Motivation', 'Milestone', 'Mindfulness'],
  },
  profilePic: Buffer,
  zipCode: { type: String },
});

const activitySchema = new Schema(
  {
    userName: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    // preference instead of category
    preference: { type: String, required: true },
    // image is stretch
    image: Buffer,
    description: { type: String, required: true },
    hypes: { type: Number, default: 0 }, // Likes
    vibes: Array, // Comments
  },
  { timestamps: true },
);

const commentSchema = new Schema(
  {
    userName: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  User,
  Activity,
  Comment,
};
