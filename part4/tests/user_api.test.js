const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const assert = require('assert')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = { username: 'root', password: passwordHash }

		await api.post('/api/users/').send(user)
	})

	test('users can be added', async () => {
		const res = await api.get('/api/users/')
		assert.strictEqual(res.body.length, 1)

		await api.post('/api/users/').send({
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		})

		const res2 = await api.get('/api/users/')
		assert.strictEqual(res2.body.length, 2)
	})

	test('faulty users can\'t be added', async () => {
		await api.post('/api/users/')
			.send({
				username: "user",
				password: "name",
			})
			.expect(201)
		await api.post('/api/users/')
			.send({
				username: "a",
				password: "name",
			})
			.expect(400)
		await api.post('/api/users/')
			.send({
				username: "user",
				password: "a",
			})
			.expect(400)
		await api.post('/api/users/')
			.send({
				password: "name",
			})
			.expect(404)
		await api.post('/api/users/')
			.send({
				username: "user",
			})
			.expect(404)
	})

	after(async () => {
		await mongoose.connection.close()
	})
})
