import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Profile photo is required",
                success: false
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        
        let cloudResponse;
        if (file) {
            console.log("File received for resume:", {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            });

            // Check if file is PDF
            if (file.mimetype !== 'application/pdf') {
                return res.status(400).json({
                    message: "Only PDF files are allowed for resumes",
                    success: false
                });
            }

            try {
                const fileUri = getDataUri(file);
                
                // UPLOAD PDF TO CLOUDINARY - FIXED DOUBLE .pdf
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: 'raw', // CRITICAL: Use 'raw' for PDF
                    public_id: `resumes/${Date.now()}_${file.originalname}`, // Keep original name with .pdf
                    type: 'upload',
                    access_mode: 'public'
                    // REMOVED: format: 'pdf' (causes double .pdf)
                });
                
                console.log("PDF uploaded to Cloudinary:", cloudResponse.secure_url);
                
            } catch (uploadError) {
                console.log("Cloudinary upload error:", uploadError);
                return res.status(400).json({
                    message: "PDF upload failed: " + uploadError.message,
                    success: false
                });
            }
        }

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        
        const userId = req.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
      
        // Handle file upload results - FIXED DOUBLE .pdf
        if(cloudResponse && file) {
            // Check if URL already ends with .pdf
            let pdfUrl = cloudResponse.secure_url;
            if (!pdfUrl.endsWith('.pdf')) {
                pdfUrl += '.pdf';
            }
            user.profile.resume = pdfUrl;
            user.profile.resumeOriginalName = file.originalname;
            console.log("PDF Resume saved:", user.profile.resume);
        }

        await user.save();

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: userResponse,
            success: true
        });
        
    } catch (error) {
        console.log("Update profile error:", error);
        return res.status(500).json({
            message: "Internal server error: " + error.message,
            success: false
        });
    }
}