'use strict'
require('dotenv').config()
const express = require('express');
const connectdb = require('./database/connection');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
var morgan = require('morgan')
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUiExpress = require('swagger-ui-express');

app.use(express.json());
app.use(cors());
app.use(morgan('combined'))

connectdb()

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Moneymate',
//       version: '1.0.0',
//     },
//     servers:[
//         {
//             url:"http://localhost:5000/"
//         }
//     ]
//   },
//   apis: ['./index.js'],
// };

// const swaggerSpec = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec))

// /**
//  * @swagger
//  * /:
//  *  post:
//  *      summary: This api is usedto check if get method is working or not
//  *      description: This api is used to check
//  *      response:
//  *          200:
//  *              description: To test method
//  */

// app.get("/",(req, res)=>{
//     return res.json({msg:"this is test method"})
// })

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