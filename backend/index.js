// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const dotenv = require("dotenv")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Use the todo routes
app.use('todo/api', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
