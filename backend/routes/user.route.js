import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import multer from "multer";

const router = express.Router();

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File too large. Maximum size is 10MB.',
                success: false
            });
        }
        return res.status(400).json({
            message: 'File upload error: ' + error.message,
            success: false
        });
    } else if (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
    }
    next();
};

// Apply multer error handling to all routes that use file upload
router.route("/register").post(singleUpload, handleMulterError, register);
router.route("/profile/update").post(isAuthenticated, singleUpload, handleMulterError, updateProfile);

router.route("/login").post(login);
router.route("/logout").get(logout);

// Add this temporary route for testing
router.route("/test-upload").post(singleUpload, handleMulterError, (req, res) => {
    try {
        console.log("Test upload - File received:", req.file);
        if (req.file) {
            console.log("File details:", {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                buffer: req.file.buffer ? `Buffer exists (${req.file.buffer.length} bytes)` : 'No buffer'
            });
            return res.status(200).json({
                message: "File received successfully",
                fileInfo: {
                    originalname: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: req.file.size
                },
                success: true
            });
        } else {
            return res.status(400).json({
                message: "No file received",
                success: false
            });
        }
    } catch (error) {
        console.log("Test upload error:", error);
        return res.status(500).json({
            message: "Test upload failed",
            success: false
        });
    }
});

export default router;