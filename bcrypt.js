import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const checkIfMatch = await bcrypt.compare(password, hashedPassword);
    return checkIfMatch;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
