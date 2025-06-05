import { comparePassword, hashedPassword } from "../bcrypt.js";
import { findEmailInDb, insertUserToDb } from "../models/User.js";
import { findUsernameInDb } from "./../models/User.js";
import jwt from "jsonwebtoken";

//create a user
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // doesnt really need this because its a check in mongoose, but i will have it for now
    const foundUser = await findEmailInDb(email);
    if (foundUser !== null) {
      return res.status(400).json({
        message: "finns redan en användare med den mejladressen",
        success: false,
      });
    }
    const foundUsername = await findUsernameInDb(username);
    if (foundUsername !== null) {
      return res.status(400).json({
        message: "finns redan en användare med det usernamet",
        success: false,
      });
    }
    const convertedPassword = await hashedPassword(password);
    const newUser = {
      username: username,
      email: email,
      password: convertedPassword,
      role: role,
    };
    const insertedUser = await insertUserToDb(newUser);
    return res.status(200).json({
      message: "user skapad succesfully",
      success: true,
      data: {
        name: insertedUser.username,
        email: insertedUser.email,
        role: insertedUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE skapa user",
      success: false,
      errorMessage: error.message,
    });
  }
};

//login user
export const logInUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({
      message: "username och password krävs i bodyn!",
      success: false,
    });
  }
  // its acctually wrong !username! but i give back info as "wrong username or password", because
  // i dont want to give to much info to the client
  try {
    const foundUsername = await findUsernameInDb(username);

    if (foundUsername === null) {
      return res.status(401).json({
        message: "fel användarnamn eller lösenord",
        success: false,
      });
    }
    const checkIfPasswordMatch = await comparePassword(
      password,
      foundUsername.password
    );
    // its acctually wrong !password! but i give back info as "wrong username or password", because
    // i dont want to give to much info to the client
    if (!checkIfPasswordMatch) {
      return res.status(401).json({
        message: "fel användarnamn eller lösenord",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        id: foundUsername._id,
        username: foundUsername.username,
        email: foundUsername.email,
        role: foundUsername.role,
      },
      process.env.MY_SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      message: "inloggningen lyckad!",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "du lyckades INTE logga in",
      success: false,
      errorMessage: error.message,
    });
  }
};
