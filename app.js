const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db/db");

const User = require("./routes/user");
const Books = require("./routes/book");
const Fav = require("./routes/fav");
const Cart = require("./routes/cart");

app.use(cors());
app.use(express.json());

app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Fav);
app.use("/api/v1", Cart);


app.get("/", (req, res) => {
  res.send("backend is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT}`);
});
