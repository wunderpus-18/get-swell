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
  // default preferences
  preferences: Object,
  profilePic: Buffer,
  zipCode: { type: String },
});

const activitySchema = new Schema(
  {
    userName: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    // preference instead of category
    category: String,
    // image is stretch
    image: Buffer,
    description: String,
    hypes: Number, // Likes
    vibes: Array, // Comments
  },
  { timestamps: true },
);

// commentSchema
// user
// text
// timestamp
//

const user = mongoose.model('user', userSchema);
const activity = mongoose.model('activity', activitySchema);

module.exports = {
  userSchema,
  activitySchema,
};
