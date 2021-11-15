const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: false
    },
});
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

////////// Middleware //////////
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


////////// Routes //////////

// Root
app.get('/', (req, res) => {
    res.send("Helllo.");
})

// Sign In
app.post('/signin', (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt);
})

// Register
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
})

// Profile
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
})

// Image
app.put('/image', (req, res) => {
    image.handleImageCount(req, res, db);
})

app.post('/imageUrl', (req, res) => {
    image.handleApiCall(req, res);
})


////////// Listen and Port //////////
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});