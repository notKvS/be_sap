import express from 'express';
const router = express.Router();
import User from '../schema/UserSchema';
const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';

const users = [
  { username: 'admin', password: 'password123' }
];

router.post('/', async (req: any, res: any) => {
  const { username, password } = req.body;

  console.log('Username login:', username, password);

  // const user = users.find(u => u.username === username && u.password === password);
  let user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'User not Found' });
  }

  const correcctPassword = await bcrypt.compare(password, user.password);
  if (!correcctPassword) return res.status(400).json({ message: "Invalid credentials" });


  const SECRET_KEY = process.env.TOKEN_SECRET as string;
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  console.log('returning token:', token);
  // res.json({ token });

  res.cookie('token', token, {
    secure: false,
    maxAge: 60 * 60 * 1000
  });

  res.json({ message: "Login sucessful", token });
});

export default router;