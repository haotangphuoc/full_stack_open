const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author')
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }

  const { title, url} = request.body
  const blog = new Blog({
    title,
    url,
    likes: 0,
    author: decodedToken.id
  })
  const savedBlog = await blog.save()

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }
  user.blogs.push(savedBlog._id);
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const editedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, editedBlog, {new:true})
  response.status(200).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter