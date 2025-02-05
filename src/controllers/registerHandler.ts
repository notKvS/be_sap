
const router = require("express").Router();
import User from '../schema/UserSchema';
import jwt from 'jsonwebtoken';

router.post("/", async (req, res) => {
  console.log('registerHandler called');
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "Username already exists" });

    user = new User({ username, password });
    await user.save();

    const SECRET_KEY = process.env.TOKEN_SECRET as string;
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    console.log('returning token:', token);

    res.cookie('token', token, {
      secure: false,
      maxAge: 60 * 60 * 1000
    });
    res.status(200).json({ message: "User registered sucessfully", tokem: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;