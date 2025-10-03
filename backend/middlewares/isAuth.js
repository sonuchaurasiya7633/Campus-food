import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    // Prefer cookie token, but allow Bearer token as fallback (for cases where cookies are blocked)
    let token = req.cookies.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({ message: "Token not Found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(400).json({ message: "Token not verify" });
    }

    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Is Auth Error" });
  }
};

export default isAuth;
