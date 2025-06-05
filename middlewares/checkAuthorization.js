// check authorization middleware

export const checkAuthorization = (req, res, next) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({
        message: "You are not an admin, so you do not have access to this!",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "A server error occurred.",
      errorMessage: error.message,
    });
  }
};
