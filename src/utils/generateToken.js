import jwt from "jsonwebtoken";

export const generateToken = (account, res) => {
  const token = jwt.sign(
    {
      id: account._id,
      role: account.role,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
};
