// check authorization middleware

export const checkAuthorization = (req, res, next) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({
        message: "du är inte admin så du har inte access till detta!",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ett serverfel uppstod.",
      errorMessage: error.message,
    });
  }
};
