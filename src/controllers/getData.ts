import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
  res.send('Data route is working');
});

export default router