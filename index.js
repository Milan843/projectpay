const port = process.env.PORT || 4000
const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');



app.listen(port, () => {
    console.log('Server is running at port ' + port)
})