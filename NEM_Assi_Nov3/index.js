const express = require('express')
const cors = require('cors')

const app = express()
const { connection } = require('./Config/db')
const { userRoute } = require('./Routes/userRoute')
const { bookRoute } = require('./Routes/bookRoute')
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use('/user', userRoute)
app.use('/book', bookRoute)

app.get('/', (req, res)=>{
    res.send({"msg": "success"})
})


app.listen(8080, async()=>{

    try {
        console.log('connecting');
        await connection;
        console.log('connected at 8080');
    } catch (error) {
        console.log('something went wrong');
        console.log(error);
    }
})