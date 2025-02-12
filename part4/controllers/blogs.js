const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const res = await Blog.find({})
	return response.json(res)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	if (blog.likes == undefined) { blog.likes = 0 }
	if (blog.title == undefined) { return response.status(400).end() }
	if (blog.url == undefined) { return response.status(400).end() }
	const res = blog.save()
	return response.status(201).json(res)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	return response.status(201).end()
	// .catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	}

	const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	return response.json(res)
	// .catch(error => next(error))
})

module.exports = blogsRouter
