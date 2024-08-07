const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app