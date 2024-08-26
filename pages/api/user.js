import connectDB from "../../utils/connections";
import { verifyToken } from "../../utils/auth";
export default async function handler(req, res) {
  if (req.method !== "GET") return;
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "con`t connect to DB :(" });
  }
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "user not signin" });
  }
  const isValid = verifyToken(token);
  if (!isValid)
    return res
      .status(401)
      .json({ status: "failed", message: "token is not valid" });
  return res.status(200).json({ status: "success", data: isValid });
}
