const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:title", async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.title });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;
  const search = req.query.search;
  const PAGE_SIZE = 12;
  const page = req.query.page;
  const total = await Post.countDocuments({});
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    } else if (category) {
      posts = await Post.find({ category }).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    } else if (search) {
      posts = await Post.find({ title: search }).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    } else {
      posts = await Post.find().limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    }
    res.status(200).json({ totalPages: Math.ceil(total / PAGE_SIZE), posts });
  } catch (err) {
    res.status(500).json(err);
  }

  //run `npm install request` in the root folder of your website to install request
  var request = require("request");
  var url = "https://geolocation-db.com/json";

  request({
    url: url,
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      // Date and time. 'body' contains data
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      let currentDate = { date: year + "-" + month + "-" + date };
      let currentTime = { time: hours + ":" + minutes + ":" + seconds };
      let userDetails = Object.assign(body, currentDate, currentTime);

      // Deleting unneccessary
      delete userDetails['country_code']
      delete userDetails['country_name']
      delete userDetails['city']
      delete userDetails['postal']
      delete userDetails['latitude']
      delete userDetails['longitude']
      delete userDetails['state']

      // Logging Result TODO
      console.log(userDetails);
    }
  });

});

module.exports = router;
