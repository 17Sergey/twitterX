import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.find({ user: user._id });

        res.status(200).json({
            ...user.toObject(),
            posts: posts.length,
        });
    } catch (error) {
        console.error(`Error in getUserProfile controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const followUnfollowUser = async (req, res) => {
    try {
        const { id: otherUserId } = req.params;
        const currentUserId = req.user._id.toString();

        const otherUser = await User.findById(otherUserId);
        const currentUser = await User.findById(currentUserId);

        if (otherUserId === currentUserId) {
            return res.status(400).json({ error: "Can't follow/unfollow yourself" });
        }

        if (!otherUser || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(otherUserId);

        if (isFollowing) {
            // Unfollow the user
            await User.findByIdAndUpdate(otherUserId, {
                $pull: { followers: currentUserId },
            });
            await User.findByIdAndUpdate(currentUserId, {
                $pull: { following: otherUserId },
            });

            return res
                .status(200)
                .json({ message: "User unfollowed successfully", followed: false });
        } else {
            // Follow the user
            await User.findByIdAndUpdate(otherUserId, {
                $push: { followers: currentUserId },
            });
            await User.findByIdAndUpdate(currentUserId, {
                $push: { following: otherUserId },
            });
            // Send notification
            const newNotification = new Notification({
                from: currentUserId,
                to: otherUserId,
                type: "follow",
            });

            await newNotification.save();

            return res.status(200).json({ message: "User followed successfully", followed: true });
        }
    } catch (error) {
        console.error(`Error in followUnfollowUser controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: {
                        $ne: userId,
                    },
                },
            },
            {
                $sample: {
                    size: 10,
                },
            },
        ]);

        const filteredUsers = users.filter(
            (user) => !usersFollowedByMe.following.includes(user._id)
        );

        const suggestedUsers = filteredUsers.length > 8 ? filteredUsers.slice(0, 8) : filteredUsers;
        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.error(`Error in getSuggestedUsers controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
        let { profileImg, coverImg } = req.body;

        const userId = req.user._id;
        let user = await User.findById(userId);

        if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both current and new passwords" });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

            if (newPassword.length < 6) {
                return res
                    .status(400)
                    .json({ error: "Password should be at least 6 characters long" });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (profileImg) {
            if (user.profileImg) {
                const imageIdFromUrl = user.profileImg.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(imageIdFromUrl);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }

        if (coverImg) {
            if (user.coverImg) {
                const imageIdFromUrl = user.coverImg.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(imageIdFromUrl);
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;

        // Check unique fields

        const userWithNewEmail = await User.findOne({ email, _id: { $ne: user._id } });
        if (userWithNewEmail) {
            return res.status(404).json({ error: "Email already exists" });
        }

        const userWithNewUsername = await User.findOne({ username, _id: { $ne: user._id } });
        if (userWithNewUsername) {
            return res.status(404).json({ error: "Username already exists" });
        }

        user.email = email || user.email;
        user.username = username || user.username;

        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();

        user.password = null;

        res.status(200).json(user);
    } catch (error) {
        console.error(`Error in updateUser controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};
