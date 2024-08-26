import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") return;
  const serial = serialize("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: "0",
  });
  return res.status(200).setHeader("Set-cookie", serial).json("sign out");
}
