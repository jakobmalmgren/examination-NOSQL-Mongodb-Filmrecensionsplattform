import jwt from "jsonwebtoken";

// check auth middleware

export const checkAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "You must include data in the header to authenticate yourself!",
      success: false,
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.MY_SECRET_KEY);
    req.role = payload.role;
    req.id = payload.id;
    req.email = payload.email;
    req.username = payload.username;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "The JWT token is invalid or expired.",
      errorMessage: error.message,
    });
  }
};
