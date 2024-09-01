const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require('./Routes/auth');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth',authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/CrudApp')
    .then(()=>{
        app.listen(5000,()=>{
            console.log("Server running on 5000");
        });
    }).catch(
        err => console.log(err)
    );

