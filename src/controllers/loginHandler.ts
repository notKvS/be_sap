import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Login route working')
  res.send('Login route is working');
});

export default router;