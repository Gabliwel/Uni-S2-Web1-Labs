const express = require('express')
const path = require('path')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

let users = []
let tokens = []

app.post('/users', (req, res) => {
    users.push({'username': req.body.username, 'password': req.body.password})
    res.sendStatus(201)
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const user = users.find((e) => e.username === req.body.username && e.password === req.body.password)
    if(user == undefined) {
        res.sendStatus(401)
    } else {
        const token = crypto.randomUUID()
        tokens.push({'username': user.username, 'token': token})
        res.send({'token': token})
    }
})

app.get('/profile', (req, res) => {
    const token = req.cookies.USER_COOKIE
    const user = tokens.find((e) => e.token == token)

    if(token == undefined || user == undefined) {
        res.redirect('/login')
    } else {
        res.render('profile', {'username': user.username})
    }
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res) => {
    const user = users.find((e) => e.username === req.body.username)
    if(user != undefined) {
        res.sendStatus(409)
    } else {
        users.push({'username': req.body.username, 'password': req.body.password})
        res.sendStatus(201)
    }
})

app.post('/disconnect', (req, res) => {
    const token = req.cookies.USER_COOKIE
    const index = tokens.findIndex((e) => e.token === token)
    if (index !== -1) {
        tokens.splice(index, 1)
    }
    res.sendStatus(200)
})


app.get('/', (req, res) => {
    const token = req.cookies.USER_COOKIE
    const user = tokens.find((e) => e.token == token)

    if(token == undefined || user == undefined) {
        res.redirect('/login')
    } else {
        res.render('profile', {'username': user.username})
    }
})

app.listen(PORT, error => {
    if(error) {
        console.log(error)
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})
