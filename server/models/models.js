const mongoose = require('mongoose');

const MONGO_URI = 'ADD URI HERE';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'SET DATABASE NAME HERE',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  preferences: Object,
  profilePic: Buffer,
});

const activitySchema = new Schema(
  {
    userName: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    category: String,
    image: Buffer,
    description: String,
    hypes: Number, // Likes
    vibes: Array, // Comments
  },
  { timestamps: true },
);

const user = mongoose.model('user', userSchema);
const activity = mongoose.model('activity', activitySchema);

module.exports = {
  userSchema,
  activitySchema,
};
