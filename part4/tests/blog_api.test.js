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

describe('blog api testing', () => {
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

	test('the first blog is about react patterns', async () => {
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

		await api.post('/api/blogs/').send({
			title: "New book",
			author: "Michael Chani",
			url: "https://reactpatsdasdasterns.com/",
			likes: 2,
		})
		const res2 = await api.get('/api/blogs')
		assert.strictEqual(res2.body.length, blogs.length + 1)
	})

	test('if likes is null it is 0', async () => {
		await api.post('/api/blogs/').send({
			title: "New book",
			author: "Michael Chani",
			url: "https://reactpatsdasdasterns.com/",
		})
		const res = await api.get('/api/blogs')
		assert.strictEqual(res.body[2].likes, 0)
	})

	test('if no title or url, return 404', async () => {
		await api.post('/api/blogs/')
			.send({
				title: "New book",
				url: "https://reactpatsdasdasterns.com/",
			})
			.expect(201)
		await api.post('/api/blogs/')
			.send({
				url: "https://reactpatsdasdasterns.com/",
			})
			.expect(400)
		await api.post('/api/blogs/')
			.send({
				title: "New book",
			})
			.expect(400)
	})

	test('blog deletion works', async () => {
		const res = await api.get('/api/blogs')
		await api.delete(`/api/blogs/${res.body[0].id}`)
		const res2 = await api.get('/api/blogs')
		assert.strictEqual(res2.body.length, 1)
	})

	test('blog updating works', async () => {
		const res = await api.get('/api/blogs')
		assert.strictEqual(res.body[0].likes, 7)
		await api.put(`/api/blogs/${res.body[0].id}`).send({
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 20,
		})
		const res2 = await api.get('/api/blogs')
		assert.strictEqual(res2.body[0].likes, 20)
	})

	after(async () => {
		await mongoose.connection.close()
	})
})
