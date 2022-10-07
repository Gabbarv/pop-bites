const router = require("express").Router();
const User = require("../models/User");
const Movie= require("../models/Moviereview");

//creat moviereview
router.post("/", async (req, res) => {
  const user = await User.findById(req.body.userid)
  
  const newReview = new Movie(req.body);
  try {
    const savedReview = await newReview.save();
    user.movieReviews.unshift({user: savedReview._id});
    await user.save();
    res.status(200).json(savedReview);
    } catch (err) {
      
    res.status(500).json(err);
  }
  
  });

  router.get("/", async (req,res) => {
        const reviews = await Movie.find({})
        res.status(200).json(reviews)

  })



  module.exports = router