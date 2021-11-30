//import dependencies
import express from 'express'
const router = express.Router()

//import blog model
import Blog from '../models/Blog.js'

//import auth middleware
import auth from '../middleware/auth.js'

//@GET - /api/blogs - get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.json(blogs)
  } catch (err) {
    res.json({ message: err })
  }
})

//@GET - /api/blogs/:id - get a single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
  } catch (err) {
    res.json({ message: err })
  }
})

//@POST - /api/blogs - create a new blog
router.post('/', auth, async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  })
  try {
    const savedBlog = await blog.save()
    res.json(savedBlog)
  } catch (err) {
    res.json({ message: err })
  }
})

//@DELETE - /api/blogs/:id - delete a blog - only admin can delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const removedBlog = await Blog.remove({ _id: req.params.id })
    res.json(removedBlog)
  } catch (err) {
    res.json({ message: err })
  }
})

//@PUT - /api/blogs/:id - update a blog - only admin can update
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedBlog = await Blog.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title, content: req.body.content } }
    )
    res.json(updatedBlog)
  } catch (err) {
    res.json({ message: err })
  }
})

export default router
