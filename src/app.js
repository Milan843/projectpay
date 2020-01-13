const express = require('express');
const userRouter = require('./api/user/routers')
const distributorRouter=require('./api/distributor/routers')


const app = express();
app.use(express.json())
app.use(userRouter);
app.use(distributorRouter)

module.exports = app;