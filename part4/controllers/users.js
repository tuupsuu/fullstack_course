const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const res = await User.find({})
	return response.json(res)
})

usersRouter.post('/', async (request, response, next) => {
	try {
		const { username, name, password } = request.body
		if (username == undefined || password == undefined) { return response.status(404).end() }
		if (username.length < 3 || password.length < 3) { return response.status(400).end() }

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)

		const user = new User({
			username,
			name,
			passwordHash,
		})

		const savedUser = await user.save()

		return response.status(201).json(savedUser)
	} catch (error) {
		next(error)
	}
})

module.exports = usersRouter
