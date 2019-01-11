const express = require("express");

const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const listRoutes = require("./listRoutes");

router.use(express.json());

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/list", listRoutes);
router.use("/api", apiRoutes);

module.exports = router;
