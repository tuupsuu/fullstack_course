const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('assert')

const api = supertest(app)

const blogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
	},
]

describe('api testing', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		let blogObject = new Blog(blogs[0])
		await blogObject.save()
		blogObject = new Blog(blogs[1])
		await blogObject.save()
	})

	test('there are two blogs', async () => {
		const res = await api.get('/api/blogs')

		assert.strictEqual(res.body.length, blogs.length)
	})

	test('the first note is about react patterns', async () => {
		const response = await api.get('/api/blogs')

		assert(response.body[0].title, 'React patterns')
	})

	after(async () => {
		await mongoose.connection.close()
	})
})
