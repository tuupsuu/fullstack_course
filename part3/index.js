require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

app.get('/info', (request, response) => {
	Person.find({}).then(persons => {
		response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`)
	})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			console.log(person)
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(201).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const reqPer = request.body
	if (!reqPer.name || reqPer.name.length < 3) {
		return response.status(500).send({ error: `Person validation failed: Name '${reqPer.name}' is shorter than the minimum allowed length, 3.` })
	}
	if (!reqPer.number || reqPer.number.length === 0) {
		return response.status(500).send({ error: 'must have number' })
	}

	Person.find({}).then(apiPersons => {
		if (apiPersons.findIndex(per => per.name === reqPer.name) > 0) {
			return response.json('name must be unique')
		}
		if (apiPersons.findIndex(per => per.number === reqPer.number) > 0) {
			return response.json('number must be unique')
		}

		const person = new Person({
			name: reqPer.name,
			number: reqPer.number,
		})
		person.save().then(result => {
			console.log('person saved')
			response.json(result)
		})
	})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)
