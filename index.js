var path = require('path');
const port = process.env.PORT || 3210
var dotenv = require('dotenv').config(path.resolve(process.cwd(), './.env'));


const app = require('./src/app');



app.listen(port, () => {
    console.log('Server is running at port ' + port)
})