import jwt from "jsonwebtoken";

export const checkAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "du måste inkludera data i header för att autentisera dig!",
      success: false,
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.MY_SECRET_KEY);
    console.log("PAYLOAD:", payload);
    req.role = payload.role;
    req.id = payload.id;
    req.email = payload.email;
    req.username = payload.username;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "jwt token är ogiltlig eller utgången",
      errorMessage: error.message,
    });
  }
};
