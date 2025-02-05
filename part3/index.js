const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(morgan('tiny'))

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523"
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-46-234345"
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122"
	}
]

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(note => note.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const rand = Math.floor(Math.random() * 1000000)
	const person = request.body
	person['id'] = `${rand}`
	console.log(person)
	if (!person.name || person.name.len == 0) {
		response.json('must have name')
	} else if (!person.number || person.number.len == 0) {
		response.json('must have number')
	} else {
		if (persons.findIndex(per => per.name == person.name) > 0) {
			response.json('name must be unique')
		} else if (persons.findIndex(per => per.number == person.number) > 0) {
			response.json('number must be unique')
		} else {
			persons.push(person)
			response.json(person)
		}
	}
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)
