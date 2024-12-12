const router = require("express").Router();
const User = require("../models/user");
const { authToken } = require("./userAuth");

router.put("/add-book-to-fav", authToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);

    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      return res.status(200).json({ message: "Already in favourites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Added to favourites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-fav-book", authToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favBooks,
    });

  } catch(error){
    console.log(error);
      return res.status(500).json({ message: "An error occured" });
    
  }
});

module.exports = router;
