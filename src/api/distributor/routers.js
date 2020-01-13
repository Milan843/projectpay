const express = require("express")
const router = express.Router()
const userAuth = require("../../middlewares/userAuth")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json');

router.use('/api', swaggerUi.serve);
router.get('/api', swaggerUi.setup(swaggerDocument));
const { addDistributor } = require("./controllers/addDistributor")

router.post("/addDistributor",userAuth, addDistributor)
module.exports = router;