const mongoose = require("mongoose");
const url = "mongodb+srv://abheshekmurugan:yY8UkEICwPRjdfgW@cluster0.w0rigi0.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log("MongoDB connection error"));
db.once("open", () => console.log("Connected to MongoDB"));
