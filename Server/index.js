const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./config/db')
const router = require ('./routes')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/api',router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
connectDb().then(()=>{
    app.listen(port, () => {
        console.log('connected to server')
      console.log(`Example app listening on port ${port}`)
    })
})
