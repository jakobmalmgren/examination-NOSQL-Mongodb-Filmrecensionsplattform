import mongoose from "mongoose";

//User model that includes the scheme and functions connected to it

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

//insert user func
export const insertUserToDb = async (userBody) => {
  try {
    const dbUser = await User.create(userBody);
    return dbUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//find email func
export const findEmailInDb = async (email) => {
  try {
    const foundUser = await User.findOne({ email: email });
    console.log("FOUNDUSER:", foundUser);

    return foundUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// find username func
export const findUsernameInDb = async (username) => {
  try {
    const foundUser = await User.findOne({ username: username });
    console.log("FOUNDUSER:", foundUser);

    return foundUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default User;
