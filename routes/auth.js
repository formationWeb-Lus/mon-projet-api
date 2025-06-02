// routes/auth.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// ✅ Login avec GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// ✅ Callback GitHub
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.json({ message: '✅ Authenticated with GitHub!', user: req.user });
  }
);

// ✅ Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: '👋 User logged out' });
  });
});

module.exports = router;
