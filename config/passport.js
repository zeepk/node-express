const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/auth/google/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					googleId: profile.id,
					displayName: profile.displayName,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					image: profile.photos[0].value,
				};
				try {
					// if user already exists, return null (no error) and the user
					let user = await User.findOne({ googleId: profile.id });
					if (user) {
						done(null, user);
					} else {
						// or create one!
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (error) {
					console.log(error);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
