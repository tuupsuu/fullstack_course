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
		let blogObject = blogs[0]
		await api.post('/api/blogs/').send(blogObject)
		blogObject = blogs[1]
		await api.post('/api/blogs/').send(blogObject)
	})

	test('there are two blogs', async () => {
		const res = await api.get('/api/blogs')

		assert.strictEqual(res.body.length, blogs.length)
	})

	test('the first note is about react patterns', async () => {
		const response = await api.get('/api/blogs')

		assert(response.body[0].title, 'React patterns')
	})

	test('blog object id is id not _id', async () => {
		const response = await api.get('/api/blogs')

		assert(response.body[0].id, !null)
		assert.ok(!('_id' in response.body[0]), 'object should not have _id field')
	})

	test('blogs can be added', async () => {
		const res = await api.get('/api/blogs')
		assert.strictEqual(res.body.length, blogs.length)

		const newBlog = {
			title: "New book",
			author: "Michael Chani",
			url: "https://reactpatsdasdasterns.com/",
			likes: 2,
		}
		await api.post('/api/blogs/').send(newBlog)
		const res2 = await api.get('/api/blogs')
		assert.strictEqual(res2.body.length, blogs.length + 1)
	})

	test('if likes is null it is 0', async () => {
		const newBlog = {
			title: "New book",
			author: "Michael Chani",
			url: "https://reactpatsdasdasterns.com/",
		}
		await api.post('/api/blogs/').send(newBlog)
		const res = await api.get('/api/blogs')
		console.log(res.body)
		assert.strictEqual(res.body[2].likes, 0)
	})

	after(async () => {
		await mongoose.connection.close()
	})
})
