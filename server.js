const express = require('express');
const app = express();
const connectDB = require('./config/db');
const usersRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const postsRoute = require('./routes/api/posts');
const profileRoute = require('./routes/api/profile');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
	res.send('Hello There');
});

app.listen(PORT, () =>
	console.log(`Server is listening on port http://localhost:${PORT}`)
);
