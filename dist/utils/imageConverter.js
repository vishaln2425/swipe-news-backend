"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWebP = convertToWebP;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const CONVERTED_DIR = path_1.default.join(__dirname, '../../public/converted');
if (!fs_1.default.existsSync(CONVERTED_DIR)) {
    fs_1.default.mkdirSync(CONVERTED_DIR, { recursive: true });
}
async function convertToWebP(inputPath, outputFileName) {
    const outputPath = path_1.default.join(CONVERTED_DIR, outputFileName);
    await (0, sharp_1.default)(inputPath)
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
