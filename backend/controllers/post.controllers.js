import User from "../models/user.model.js";
import Post from "../models/post.model.js";

import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        if (!text && !img) {
            return res.status(400).json({ error: "A post must have a text or an image" });
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.error(`Error in createPost controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== userId.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this post" });
        }

        if (post.img) {
            const imageIdFromUrl = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imageIdFromUrl);
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(`Error in deletePost controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const commentPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = {
            user: userId,
            text,
        };

        post.comments.push(comment);
        await post.save();

        const newPost = await post.populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(post);
    } catch (error) {
        console.error(`Error in commentPost controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            await Post.updateOne(
                { _id: postId },
                {
                    $pull: { likes: userId },
                }
            );

            await User.updateOne(
                { _id: userId },
                {
                    $pull: { likedPosts: postId },
                }
            );

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());

            return res.status(200).json({ updatedLikes });
        } else {
            post.likes.push(userId);
            await post.save();

            await User.updateOne(
                { _id: userId },
                {
                    $push: { likedPosts: postId },
                }
            );

            // Do not send notifications when we like our post
            if (post.user._id.toString() !== userId.toString()) {
                const notification = new Notification({
                    type: "like",
                    from: userId,
                    to: post.user,
                });
                await notification.save();
            }

            const updatedLikes = post.likes;

            return res.status(200).json({ updatedLikes });
        }
    } catch (error) {
        console.error(`Error in likeUnlikePost controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // get the latest post at the top
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        if (posts.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error(`Error in getAllPosts controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const getLikedPosts = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        return res.status(200).json(likedPosts);
    } catch (error) {
        console.error(`Error in getAllPosts controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const getFollowingPosts = async (req, res) => {
    try {
        const user = req.user;
        const followingPosts = await Post.find({
            user: { $in: user.following },
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        return res.status(200).json(followingPosts);
    } catch (error) {
        console.error(`Error in getAllPosts controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userPosts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        return res.status(200).json(userPosts);
    } catch (error) {
        console.error(`Error in getAllPosts controller: ${error.message}`);
        res.status(500).json({ error: "Server error" });
    }
};
