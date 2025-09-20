import jwt from "jsonwebtoken";

export const generateToken = (role, _id, res) => {
  const token = jwt.sign(
    {
      _id,
      role,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
};
