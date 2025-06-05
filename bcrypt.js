import bcrypt from "bcrypt";

//converting a password to a hashed func

export const hashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// comparing password func
export const comparePassword = async (password, hashedPassword) => {
  try {
    const checkIfMatch = await bcrypt.compare(password, hashedPassword);
    return checkIfMatch;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
