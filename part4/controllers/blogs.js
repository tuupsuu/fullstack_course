const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}


blogsRouter.get('/', async (request, response) => {
	const res = await Blog.find({}).populate('user')
	return response.json(res)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	if (body.likes == undefined) { body.likes = 0 }
	if (body.title == undefined) { return response.status(400).end() }
	if (body.url == undefined) { return response.status(400).end() }

	const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})
	const res = await blog.save()
	user.blogs = user.blogs.concat(res._id)
	await user.save()

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
