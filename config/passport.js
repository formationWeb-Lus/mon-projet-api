const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

const user = {};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
},
(accessToken, refreshToken, profile, done) => {
  user.id = profile.id;
  user.username = profile.username;
  user.profileUrl = profile.profileUrl;
  return done(null, user);
}));
