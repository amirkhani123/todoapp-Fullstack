import { hash } from "bcryptjs";


const HashedPassword = async (password) => {
  const newPassword = await hash(password, 12);
  return newPassword;
};
export {  HashedPassword };
