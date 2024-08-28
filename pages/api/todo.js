import connectDB from "../../utils/connections";
import userModels from "../../models/user";
import { verifyToken } from "../../utils/auth";
import { serialize } from "cookie";
import { sortTodos } from "../../utils/helpers";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "can`t connect to DB :(" });
  }
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ status: "failed", message: "user not signin !!!" });
  const isValidToken = verifyToken(token);
  const serial = serialize("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  if (!isValidToken)
    return res
      .status(401)
      .setHeader("Set-Cookie", serial)
      .json({ status: "failed", message: "token is not valid" });
  const {
    result: { userName },
  } = isValidToken;
  if (req.method === "POST") {
    const { title, status } = req.body;
    if (!title || !status)
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data !!!" });
    const myUser = await userModels.findOne({
      userName: userName,
    });
    try {
      myUser.todos.push({ title, status });
      await myUser.save();
      return res
        .status(201)
        .json({ status: "success", message: "todo create sucessfully" });
    } catch (error) {
      return res
        .status(422)
        .json({ status: "failed", message: "todo not create !!!" });
    }
  } else if (req.method === "GET") {
    const myUser = await userModels.findOne({ userName: userName });
    if (!myUser.todos) {
      return res
        .status(200)
        .json({ status: "success", message: "todos empty !" });
    }
    const myTodos = sortTodos(myUser.todos);
    return res.status(200).json({ status: "success", data: myTodos });
  } else if (req.method === "PATCH") {
    const { id } = req.body;
    if (req.body.status) {
      const { status } = req.body;
      try {
        const mewTodo = await userModels.updateOne(
          { "todos._id": id },
          { $set: { "todos.$.status": status } }
        );
        return res.status(200).json({
          status: "success",
          message: "todos updated success",
          data: mewTodo,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ status: "success", message: "todos updated success" });
      }
    } else if (req.body.title) {
      const { title } = req.body;
      try {
        const mewTodo = await userModels.updateOne(
          { "todos._id": id },
          { $set: { "todos.$.title": title } }
        );
        return res.status(200).json({
          status: "success",
          message: "todos updated success",
          data: mewTodo,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ status: "success", message: "todos updated success" });
      }
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    const user = await userModels.findOne({ userName: userName });
    const filterTodos = user.todos.filter((todo) => todo.id !== id);
    try {
      user.todos = filterTodos;
      user.save();
      return res
        .status(200)
        .json({ status: "success", message: "todo deleted successfully :)" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "failed", message: "todos not deleted  :)" });
    }
  }
}
