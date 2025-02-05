import express from 'express';
import loginHandler from './controllers/loginHandler';
import getData from './controllers/getData';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/login', loginHandler);
app.use('/getData', getData)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});