import dotenv from 'dotenv';
import express from 'express';
import loginHandler from './controllers/loginHandler';
import getData from './controllers/getData';
import { verifyUser } from './controllers/verifyUser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { register } from 'module';
import registerHandler from './controllers/registerHandler';
const cors = require('cors');

dotenv.config();
const app = express();

app.use(bodyParser.json())

app.use(cors({ credentials: true, origin: process.env.FE_ORIGIN }));

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  console.log('Api called');
  res.send('Server is running');
});

app.use('/login', loginHandler);
app.use('/register', registerHandler);
app.use('/getData', verifyUser as any, getData)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});