const {test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const listWith0Blog = []
const listWith1Blog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]
const listWithManyBlogs = [
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of emtpy list is zero', () => {
    const sum = listHelper.totalLikes(listWith0Blog)
    assert.strictEqual(sum, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const sum = listHelper.totalLikes(listWith1Blog)
    assert.strictEqual(sum, listWith1Blog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const sum = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(sum, 24)
  })
})

describe('favoriteBlog', () => {
  test('no blog return null', () => {
    maxLike = listHelper.favoriteBlog(listWith0Blog)
    assert.strictEqual(maxLike, null)
  })

  test('1 blog return the like of itself', () => {
    maxLike = listHelper.favoriteBlog(listWith1Blog)
    assert.strictEqual(maxLike, listWith1Blog[0])
  })

  test('list with many blogs return one with most like', () => {
    maxLike = listHelper.favoriteBlog(listWithManyBlogs)
    assert.strictEqual(maxLike, listWithManyBlogs[2])
  })
})