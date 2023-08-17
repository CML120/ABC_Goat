const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  // Define the fields for the Profile schema
  // Example:
  // name: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   trim: true,
  // },
  // skills: [
  //   {
  //     type: String,
  //     trim: true,
  //   },
  // ],
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
