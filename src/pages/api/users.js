import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: "Please provide username and password",
        });
      }
      try {
        let user = await User.findOne({ username });
        if (user) {
          return res
            .status(400)
            .json({ success: false, error: "User already exists" });
        }
        user = await User.create(req.body);
        const token = generateToken(user);
        res.status(201).json({ success: true, data: { user, token } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
