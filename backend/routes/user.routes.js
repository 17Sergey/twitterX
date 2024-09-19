import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import {
    followUnfollowUser,
    getSuggestedUsers,
    getUserFollowers,
    getUserFollowing,
    getUserProfile,
    updateUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/suggested", protectRoute, getSuggestedUsers);

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/profile/followers/:username", getUserFollowers);
router.get("/profile/following/:username", getUserFollowing);

router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

export default router;
