const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../../middleware/requireLogin");
const Post = mongoose.model("Post");

router.post("/createpost", requiredLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please add all the field" });
  }
  req.user.password = undefined;
  // console.log(req.user)
  // res.send('ok')
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
