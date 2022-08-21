const Blog = require('../models/blogModel')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'test3',
    author: 'testttttt',
    url: 'url.com/url',
    likes: 2,
    user: '63011136ce96b69ad2e06fe2',
  },
  {
    title: 'test2',
    author: 'testttttt',
    url: 'url.com/url',
    likes: 2,
    user: '63011136ce96b69ad2e06fe2',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'aaa' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
