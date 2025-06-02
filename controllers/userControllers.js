import { hashedPassword } from "../bcrypt.js";
import { findEmailInDb, insertUserToDb } from "../models/User.js";

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const foundUser = await findEmailInDb(email);
    if (foundUser !== null) {
      return res
        .status(400)
        .json({ message: "finns redan en användare med den mejladressen" });
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
