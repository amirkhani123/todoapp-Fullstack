import { compare, hash } from "bcryptjs";

const HashedPassword = async (password) => {
  const newPassword = await hash(password, 12);
  return newPassword;
};
const verifyPassword = async (password, HashedPassword) => {
  const isValid = await compare(password, HashedPassword);
  return isValid;
};
export { HashedPassword, verifyPassword };
