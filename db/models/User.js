const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  joinDate: {
    type: Date,
    default: Date.now,
  },

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
  },
});

UserSchema.pre('save', function(next) {
  console.log("PRE");
  if (!this.isModified('password')) {
    return next();
  }

  console.log("GenSalt");
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    console.log("Hashing");
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  })
});

module.exports = mongoose.model('User', UserSchema);
