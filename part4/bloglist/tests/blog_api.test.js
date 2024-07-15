const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for(let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTTP GET request tests', () => {
  test('HTTP GET to /api/blogs URL return correct data', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('HTTP GET return data with id field', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(undefined, response.body[0]._id)
    assert.strictEqual("5a422a851b54a676234d17f7", response.body[0].id)
  })
})

describe('HTTP POST request test', () => {
  test('POST request makes correct change to the DB', async () => {
    const newBlog = {
      _id: "5a422b3a1b54a676233d17f9",
      title: "Test",
      author: "Hao Tang",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const getResponse = await api.get('/api/blogs')
    const blogAtEnd = getResponse.body[getResponse.body.length - 1]
    assert.strictEqual(getResponse.body.length, initialBlogs.length + 1)
    assert.deepStrictEqual(blogAtEnd.title, newBlog.title)
  })
})

describe('HTTP DELETE request test', () => {
  test('DELETE request makes correct change to the DB', async () => {
    const blogID = '5a422a851b54a676234d17f7'
    await api.delete(`/api/blogs/${blogID}`)
      .expect(204)

    const getResponse = await api.get('/api/blogs')
    const blogsIDList = getResponse.body.map(blog => blog.id)
    assert(!blogsIDList.includes(blogID))
  })
})

describe('HTTP PUT request test', () => {
  test('PUT request makes correct change to the DB', async () => {
    const blogToBeEdited = {
      _id: "5a422a851b54a676234d17f7",
      title: "Test",
      author: "Hao Tang",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

    const getResponse = await api.get('/api/blogs')
    const putResponse = await api.put(`/api/blogs/${blogToBeEdited._id}`)
      .send(blogToBeEdited)
      .expect(200)
    assert.deepStrictEqual(putResponse.body.title, blogToBeEdited.title)
    assert.strictEqual(getResponse.body.length, initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})