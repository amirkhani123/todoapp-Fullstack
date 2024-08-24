import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

const HashedPassword = async (password) => {
  const newPassword = await hash(password, 12);
  return newPassword;
};
const verifyPassword = async (password, HashedPassword) => {
  const isValid = await compare(password, HashedPassword);
  return isValid;
};
const verifyToken = (token) => {
  try {
    const result = verify(token, process.env.SECRET_KEY);
    return { result };
  } catch (error) {
    return false;
  }
};
export { HashedPassword, verifyPassword, verifyToken };
