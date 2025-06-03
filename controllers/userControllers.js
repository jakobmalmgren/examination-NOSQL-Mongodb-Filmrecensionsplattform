import { comparePassword, hashedPassword } from "../bcrypt.js";
import { findEmailInDb, insertUserToDb } from "../models/User.js";
import { findUsernameInDb } from "./../models/User.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // behövs igentligen inte för de checkhas ju redan me mongoose
    //men har den för nu
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

export const logInUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({
      message: "username och password krävs i bodyn!",
      success: false,
    });
  }
  // de är fel användarnamn!, men skriver "fel användarnamn eller lösenord"
  // för att inte ge för mycke info till front
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
    // de är fel lösenord!, men skriver "fel användarnamn eller lösenord"
    // för att inte ge för mycke info till front
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
