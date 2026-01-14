require('dotenv').config()
const connectDB = require('./bd/connect')
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.use (express.json ());

app.use('api/v1/users', require('./routes/userRouter'));

connectDB(process.env.MONGODB_URI)
.then(() => {
    console.log("connect to mongoDB");
    app.listen(port ,() => {
        console.log(`server is running at http://localhost:${port}`)
    });
})
.catch((error) => {
    console.error('error connection to mongoDB:',error);
})