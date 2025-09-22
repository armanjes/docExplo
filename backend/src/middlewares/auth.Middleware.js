import jwt from "jsonwebtoken";

// authenticate user (from JWT token)
export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ ok: false, message: "Access denied. No token provided." });

  try {
    const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = { _id, role };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ ok: false, message: "Invalid or expired token" });
  }
};

// Role-based authorization
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    next();
  };
};
