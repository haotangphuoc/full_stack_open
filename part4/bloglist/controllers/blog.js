const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { ObjectId } = require('mongodb');
require('express-async-errors')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('author')
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  console.log(request.body.author)
  const user = await User.findById(request.body.author)
  console.log(user)
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }
  user.blogs.push(savedBlog._id);
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
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

module.exports = blogRouter