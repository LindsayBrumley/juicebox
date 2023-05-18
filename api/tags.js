const express = require("express");
const tagsRouter = express.Router();
const { getAllTags } = require("../db");
const { tag } = require("./users");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tag,
  });
});

module.exports = tagsRouter;
