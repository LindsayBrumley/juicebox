const express = require("express");
const postsRouter = express.Router();
const { getAllPosts } = require("../db");
const { post } = require("./users");

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    post,
  });
});

module.exports = postsRouter;
