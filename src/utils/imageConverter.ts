import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const CONVERTED_DIR = path.join(__dirname, '../../public/converted');
if (!fs.existsSync(CONVERTED_DIR)) {
  fs.mkdirSync(CONVERTED_DIR, { recursive: true });
}

export async function convertToWebP(inputPath: string, outputFileName: string): Promise<string> {
  const outputPath = path.join(CONVERTED_DIR, outputFileName);
  await sharp(inputPath)
    .resize({
      width: 412,
      height: 640,
      fit: 'inside', // ✅ Fit the image INSIDE the box without cropping
      withoutEnlargement: true, // 🚫 Prevents upscaling small images
    }) 
    .webp({ quality: 70 })
    .toFile(outputPath);

  return `/public/converted/${outputFileName}`;
}