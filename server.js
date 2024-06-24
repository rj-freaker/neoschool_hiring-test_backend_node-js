const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const port = process.env.DEV_PORT;

const app = express();

const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bodyParser = require('body-parser');

const db = require('./dbConnect');
db().then(() => {
    console.log('connection successfully established');
}).catch(err => console.log("Error in connection ", err));

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/user',contactRoutes);

app.get('/', (req,res) => {
    res.send("Hi this is default request")
});


app.listen(port, ()=> {
    console.log('Server is starting ......');
    console.log(`Port no is ${port}`);
})