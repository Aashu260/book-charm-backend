const router = require("express").Router();
const User = require("../models/user");
const { authToken } = require("./userAuth");

router.put("/add-to-cart", authToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);

    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      return res.json({
        status: "success",
        message: "Book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.json({
      status: "success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

router.put("/remove-from-cart/:bookid", authToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.json({
      status: "success",
      message: "Removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

router.get("/get-user-cart", authToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    return res.json({
      status: "success",
      message: "cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

module.exports = router;
