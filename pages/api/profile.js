import connectDB from "../../utils/connections";
import { verifyPassword, verifyToken } from "../../utils/auth";
import userModels from "../../models/user";
export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "con`t connect to DB :(" });
  }
  const { token } = req.cookies;
  if (!token) return res.status(401).json("usern not sigin !!!");
  const isValid = verifyToken(token);
  if (!isValid) return res.status(401).json("usern not sigin !!!");
  const {
    result: { userName },
  } = isValid;
  if (req.method === "POST") {
    const { name, lastName, password } = req.body;
    if (!name || !lastName || !password)
      return res.status(422).json("Invalid Data !!!");
    const user = await userModels.findOne({ userName: userName });
    if (!user) return res.status(422).json("user not existed !!!");
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword)
      return res
        .status(422)
        .json({ status: "incorrect", message: "password incorrect !!!" });
    console.log(isValidPassword);
    try {
      user.name = name;
      user.lastName = lastName;
      await user.save();
      return res
        .status(200)
        .json({ status: "success", message: "user updated success " });
    } catch (error) {
      return res.status(500).json("user not updated ");
    }
  } else if (req.method === "GET") {
    const user = await userModels.findOne({ userName: userName });
    if (user.name || user.lastName) {
      return res.status(200).json({ status: "complete", data: user });
    } else {
      return res.status(200).json({ status: "uncomplet" });
    }
  }
}
