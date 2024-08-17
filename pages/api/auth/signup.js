import userModels from "../../../models/user";
import { HashedPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connections";

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
  const userExisting = await userModels.findOne({ userName: userName });
  if (userExisting) {
    return res
      .status(422)
      .json({ status: "existing", message: "user existing !!!" });
  }
  const passwordHashed = await HashedPassword(password);
  try {
    await userModels.create({ userName: userName, password: passwordHashed });
    return res
      .status(200)
      .json({ status: "status", message: "user created successfully" });
  } catch (error) {
    return res
      .status(422)
      .json({ status: "failed", message: "user not created !!!" });
  }
}
