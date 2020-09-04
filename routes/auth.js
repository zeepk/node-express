const express = require('express');
const router = express.Router();
const passport = require('passport');

// using the Google strategy that we created in passport.js

// auth with google
// GET /auth/google
// we want the scope of whatever is included in the profile
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// google auth callback
// GET /auth/google/callback
// if fails, will redirect to /
// if success, will redirect to /dashboard
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/dashboard');
	}
);

module.exports = router;
