import jwt from "jsonwebtoken";

export const generateToken = (_id, role, res) => {

  const token = jwt.sign(
    {
      _id,
      role,
    },
    process.env.JWT_SECRET
  );
  return res.cookie("token", token);
};
