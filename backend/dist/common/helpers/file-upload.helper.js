"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.storage = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
exports.storage = (0, multer_1.diskStorage)({
    destination: (req, file, callback) => {
        const uploadPath = './src/assets/profile_images';
        if (!(0, fs_1.existsSync)(uploadPath)) {
            (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
        }
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
        callback(null, uniqueName);
    },
});
const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=file-upload.helper.js.map