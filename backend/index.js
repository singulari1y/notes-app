const express = require("express");
const db = require("./db");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["secret"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: "162809286230-6v06ommbd6pkjr37fd6gs7hc4cn1uv7f.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = new User({
          googleId: profile.id,
          userName: profile.displayName,
          notes: [],
        });
        await newUser.save();
        user = newUser;
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(403).json({ error: "Unauthorised user" });
  }
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/redirect", passport.authenticate("google", { successRedirect: "http://localhost:3000", failureRedirect: "auth/login/failed" }), (req, res) => {
  res.status(200).json(req.user);
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("http://localhost:3000/login");
});

app.get("/notes/:googleId", async (req, res) => {
  const { googleId } = req.params;
  const user = await User.findOne({ googleId: googleId });
  const notes = user.notes;
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content, googleId } = req.body;
  const user = await User.findOne({ googleId: googleId });
  try {
    const note = { title, content };
    await User.findOneAndUpdate({ googleId: googleId }, { $push: { notes: note } }, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
