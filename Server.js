const express = require('express');
const connectDB = require('./Config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

//Init req.body Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => { res.send('API Running') });

// Define Routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/posts', require('./Routes/posts'));
app.use('/api/profile', require('./Routes/profile'));

const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // here will pass an object to env so it will understand where the configuration file is located
const environment = process.env.NODE_ENV;

if (process.env.NODE_ENV === environment) {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
