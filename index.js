require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
// const axios = require('axios');
const userModel = require('./models/user');
const app = express();
const port = process.env.PORT;

const userRoutes = require('./route/user');

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes)

//connecting to mongodb
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.log(err));

//drop mongodb database
mongoose.connection.dropDatabase(console.log('database dropped'));


//fetch data and add to mongodb database
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        for (const usersData of data) {
            const user = new userModel(usersData);
            user.save().then(() => console.log(`the user with ${usersData.name} and ${usersData.id} added to the database`));
        }
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', async (req, res) => {
    const users = await userModel.find();
    res.json(users)
})