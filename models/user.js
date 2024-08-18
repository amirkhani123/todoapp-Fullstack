const { Schema, models, model } = require("mongoose");

const userShema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  todos: [{ title: String, status: String }],
});
const userModels = models.userModels || model("userModels", userShema);
export default userModels;
