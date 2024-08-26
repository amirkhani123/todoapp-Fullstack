import { sign } from "jsonwebtoken";
import userModels from "../../../models/user";
import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connections";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "con`t connect to DB :(" });
  }
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(422)
      .json({ status: "failed", message: "invalid data :(" });
  }
  const user = await userModels.findOne({ userName: userName });
  if (!user) {
    return res
      .status(422)
      .json({ status: "existing", message: "user not existing !!!" });
  }
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword)
    return res
      .status(422)
      .json({ status: "failed", message: "userName or password incorrect" });
  const expire = 24 * 60 * 60;
  const token = sign({ userName }, process.env.SECRET_KEY, {
    expiresIn: expire,
  });
  const serial = serialize("token", token, {
    httpOnly: true,
    maxAge: expire,
    path: "/",
  });
  return res
    .status(200)
    .setHeader("Set-Cookie", serial)
    .json({ status: "success", message: "welocme " });
}
