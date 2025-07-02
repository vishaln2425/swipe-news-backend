import express from 'express';
import path from 'path';
import fs from 'fs';
import { news } from '../data/dummyNews';
import { convertToWebP } from '../utils/imageConverter';

const router = express.Router();
const PUBLIC_DIR = path.join(__dirname, '../../public');
const CONVERTED_DIR = path.join(PUBLIC_DIR, 'converted');

router.get('/', async (req, res) => {
  try {
    const convertedNews = await Promise.all(news.map(async (item) => {
      const ext = path.extname(item.imageUrl);
      const fileName = path.basename(item.imageUrl, ext);
      const originalImagePath = path.join(PUBLIC_DIR, 'news', `${fileName}${ext}`);
      const webpFileName = `${fileName}.webp`;
      const webpPath = path.join(CONVERTED_DIR, webpFileName);

      if (!fs.existsSync(webpPath)) {
        await convertToWebP(originalImagePath, webpFileName);
      }

      return {
        ...item,
        imageUrl: `http://localhost:3000/public/converted/${webpFileName}`
      };
    }));

    res.json(convertedNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing images' });
  }
});

export default router;