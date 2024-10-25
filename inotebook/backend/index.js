// express server file
const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
// to work with Express
const app = express()

const port = 3123

app.use(express.json())

// Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
