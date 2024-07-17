const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length == 0) {
    return null
  }
  return blogs.reduce((acc, curr) => {
    if(acc.likes < curr.likes) {
      return curr
    }
    return acc
  }, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}