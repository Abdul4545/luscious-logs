const connectToMongo = require('./database')
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./Routes/auth'))

app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
  console.log(`Luscious Logs backend listening at http://localhost:${port}`)
})


