const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)
	if (blog.likes == undefined) { blog.likes = 0 }
	if (blog.title == undefined) { return response.status(400).end() }
	else if (blog.url == undefined) { return response.status(400).end() }
	blog.save()
		.then(result => {
			response.status(201).json(result)
		})
})

blogsRouter.delete('/:id', (request, response) => {
	Blog.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(201).end()
		})
		.catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	}

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedBlog => {
			response.json(updatedBlog)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter
