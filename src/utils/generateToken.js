import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
};
