const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (request, response) => {
	Person.find({}).then(persons => {
		response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`)
	})
})

personsRouter.get('/', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(201).end()
		})
		.catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
	const body = request.body
	if (!body.name || body.name.length < 3) {
		return response.status(500).send({ error: `Person validation failed: Name '${body.name}' is shorter than the minimum allowed length, 3.` })
	}
	if (!body.number || body.number.length === 0) {
		return response.status(500).send({ error: 'must have number' })
	}

	Person.find({}).then(apiPersons => {
		if (apiPersons.findIndex(per => per.name === body.name) > 0) {
			return response.status(500).send({ error: 'name must be unique' })
		}
		if (apiPersons.findIndex(per => per.number === body.number) > 0) {
			return response.status(500).send({ error: 'number must be unique' })
		}

		const person = new Person({
			name: body.name,
			number: body.number,
		})
		person.save().then(result => {
			console.log('person saved')
			response.json(result)
		})
	})
		.catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter
