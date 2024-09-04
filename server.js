const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require('./Routes/auth');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Server running on 5000");
        });
    }).catch(
        err => console.log(err)
    );

