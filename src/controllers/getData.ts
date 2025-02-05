import express from 'express';
import Image from '../schema/ImageSchema.ts';
const router = express.Router();

router.use('/', async (req, res) => {
  // res.send('Data route is working');
  try {
    const randomIndex = Math.floor(Math.random() * 4) + 1;
  
    const image = await Image.findOne({ name: `Image ${randomIndex}` });
    console.log('Image found:', image);
    res.json(image);
  } catch (error) {
    console.log("Error fethcing iamge", error?.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router