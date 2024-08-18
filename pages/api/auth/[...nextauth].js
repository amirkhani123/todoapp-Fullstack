import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/connections";
import userModels from "../../../models/user";
import { verifyPassword } from "../../../utils/auth";
export default nextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          await connectDB();
        } catch (error) {
          throw new Error("con`t connect to DB :(");
        }
        const { userName, password } = credentials;
        if (!userName || !password) throw new Error("Invalid Data !");

        const user = await userModels.findOne({ userName: userName });
        if (!user) throw new Error("user not exist !");
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("userName or password incorrect !!!");

        return { userName };
      },
    }),
  ],
});
