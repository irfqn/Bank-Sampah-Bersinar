// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// // singup model
// userSchema.statics.signup = async function (email, password) {
//   // validator
//   if (!email || !password) {
//     throw Error("The email or passsword should be field");
//   }

//   if (!validator.isEmail(email)) {
//     throw Error("The email is not valid");
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw Error("The password is not strong enough");
//   }

//   // email existing check
//   const exists = await this.findOne({ email });
//   if (exists) {
//     throw Error("This email already use");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ email, password: hash });

//   return user;
// };

// // login model
// userSchema.statics.login = async function (email, password) {
//   // validator
//   if (!email || !password) {
//     throw Error("the email or password should be filled");
//   }

//   // email existing check
//   const user = await this.findOne({ email });
//   if (!user) {
//     throw Error("Incorrext email");
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Incorrect password");
//   }

//   return user;
// };

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthPlace: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// signup model
userSchema.statics.signup = async function ({ email, password, firstName, lastName, birthPlace, birthDate, phone, nik, address }) {
  // validator
  if (!email || !password || !firstName || !lastName || !birthPlace || !birthDate || !phone || !nik || !address) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("The email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("The password is not strong enough");
  }

  // email existing check
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("This email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, firstName, lastName, birthPlace, birthDate, phone, nik, address });

  return user;
};

// login model
userSchema.statics.login = async function (email, password) {
  // validator
  if (!email || !password) {
    throw Error("the email or password should be filled");
  }

  // email existing check
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
