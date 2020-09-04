const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

// load config
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// logging
if (process.env.NODE_ENV === 'developent') {
	// tells the app to use morgan middleware
	app.use(morgan('dev'));
}

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// session middleware
app.use(
	session({
		secret: 'the session',
		resave: false,
		saveUninitialized: false,
	})
);

// set passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
