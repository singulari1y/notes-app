const express = require("express");
const db = require("./db");
const http = require("http");
const cors = require("cors");
const Note = require("./models/Note");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get("/notes", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ title, content });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
