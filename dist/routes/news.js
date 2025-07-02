"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dummyNews_1 = require("../data/dummyNews");
const imageConverter_1 = require("../utils/imageConverter");
const router = express_1.default.Router();
const PUBLIC_DIR = path_1.default.join(__dirname, '../../public');
const CONVERTED_DIR = path_1.default.join(PUBLIC_DIR, 'converted');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
router.get('/', async (req, res) => {
    try {
        const convertedNews = await Promise.all(dummyNews_1.news.map(async (item) => {
            const ext = path_1.default.extname(item.imageUrl);
            const fileName = path_1.default.basename(item.imageUrl, ext);
            const originalImagePath = path_1.default.join(PUBLIC_DIR, 'news', `${fileName}${ext}`);
            const webpFileName = `${fileName}.webp`;
            const webpPath = path_1.default.join(CONVERTED_DIR, webpFileName);
            if (!fs_1.default.existsSync(webpPath)) {
                await (0, imageConverter_1.convertToWebP)(originalImagePath, webpFileName);
            }
            return {
                ...item,
                imageUrl: `${BASE_URL}/public/converted/${webpFileName}`
            };
        }));
        res.json(convertedNews);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing images' });
    }
});
exports.default = router;
