const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

db();
