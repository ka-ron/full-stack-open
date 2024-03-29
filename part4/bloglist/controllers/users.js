const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }


  const usernameCheck = await username.length  
  const passwordCheck = await password.length

  if (!(username && password )) {
    return response.status(400).json({
      error: 'please insert both username & password '
      })
  }

  if(usernameCheck < 3 || passwordCheck <3) {
      return response.status(400).json({
      error: 'username & password must contain 3 characters minimum'
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', { author: 1, title: 1 })
  response.json(users)

});

module.exports = usersRouter