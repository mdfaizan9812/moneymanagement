'use strict'
require('dotenv').config()
const express = require('express');
const connectdb = require('./database/connection');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
var morgan = require('morgan')

app.use(express.json());
app.use(cors());
app.use('/public',express.static('public'));
// app.use('/uploads', express.static('uploads'))
app.use(morgan('combined'))

connectdb()

// endpoins
app.use("/api/v1", require("./router"));

// global error handler
app.use((err, req, res, next) => {
    err.status = err.status ? err.status : 400;
    if (err?.message?.details) {
        return res.status(err.status).json({ status: err.status, message: err.message.details[0].message })
    } else if (err.message) {
        return res.status(err.status).json({ status: err.status, message: err.message })
    }
})

app.listen(port, (error) => {
    if (error) {
        console.log(error, "error in listening");
        return;
    }
    console.log(`listening on http://localhost:${port}`);
})