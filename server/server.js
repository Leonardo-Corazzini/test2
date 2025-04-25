const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const dataRouter = require('./routers/dataRouter')
const userRouter = require('./routers/userRouter')
const jwt = require('jsonwebtoken');
const SECRET = 'segreto-super-sicuro'

// const fileUpload = require('express-fileupload')

app.use(cors())
app.use(express.json())
// app.use(fileUpload())

// app.use(express.static('public'))
// app.use(express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Server attivo')
})

app.use('/data', dataRouter)
app.use('/user', userRouter)


app.get('/verify-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"

    if (!token) return res.status(401).json({ message: 'Token mancante' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token non valido' });
        res.json({ username: user.username }); // o altri dati
    });
});
app.listen(PORT, (req, res) => {
    console.log('Server in ascolto');
})