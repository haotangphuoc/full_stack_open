const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('express-async-errors')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(username.length < 3 || password.length < 3) {
    response.status(400).json({'error': 'invalid field'})
  }

  const saltRound  = 10
  const passwordHash = await bcrypt.hash(password, saltRound)

  const user = new User({
    username, 
    name,
    passwordHash
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter