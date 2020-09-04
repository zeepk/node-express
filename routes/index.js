const express = require('express');
const router = express.Router();

// login/landing page
// GET /
router.get('/', (req, res) => {
	res.render('Login', {
		layout: 'login',
	});
});

// dashboard
// GET /dashboard
router.get('/dashboard', (req, res) => {
	res.render('Dashboard');
});

module.exports = router;
