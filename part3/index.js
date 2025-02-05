require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
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

app.get('/api/persons/:id', (request, response) => {
	Person.find({ id: request.params.id }).then(persons => {
		response.json(persons)
	})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(201).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
	const reqPer = request.body
	if (!reqPer.name || reqPer.name.len == 0) {
		return response.json('must have name')
	}
	if (!reqPer.number || reqPer.number.len == 0) {
		return response.json('must have number')
	}

	Person.find({}).then(apiPersons => {
		if (apiPersons.findIndex(per => per.name == reqPer.name) > 0) {
			return response.json('name must be unique')
		}
		if (apiPersons.findIndex(per => per.number == reqPer.number) > 0) {
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
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)
