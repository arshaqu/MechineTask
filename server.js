const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors({
    origin:['http://localhost:3000']
}))
require('dotenv').config()
const dbConfig = require("./confiq/dbConfig")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const userRoute = require("./Routes/userRoutes")
const port = process.env.PORT || 5000

app.use('/file', express.static('./File'));

app.use('/api/user',userRoute)
app.listen(port,() => console.log(`start Listening Port ${port}`))