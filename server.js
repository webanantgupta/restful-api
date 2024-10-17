const express = require('express');
const app = express();
const port = 8080;
let connect = require('./db');
connect();
const cors = require('cors');


//all router import here
let userRouter = require('./routers/userRoutes')
let postRouter = require('./routers/postRoutes')


app.use(cors())
// converts all data to json
//middleware
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('welcome');
})

// middle wares are functions that modify (req,res) can also be used in routes
app.use('/user', userRouter)
app.use('/post', postRouter)



app.listen(port,()=>{
    console.log('server is running on port' +port);
    
})


