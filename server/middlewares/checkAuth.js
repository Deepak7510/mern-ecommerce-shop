import JsonWebToken from "jsonwebtoken";

export const checkAuthenticated = async (req, res, next) => {
  const token = req.cookies.token
    ? req.cookies.token
    : req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1] !== "null"
    ? req.headers["authorization"].split(" ")[1]
    : null;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized user.",
    });
  }
  try {
    const decode = JsonWebToken.decode(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status().json({
      success: false,
      message: "Unauthorised User !",
    });
  }
};
