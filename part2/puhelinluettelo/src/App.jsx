import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		personService
			.getAll()
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	const addContact = (event) => {
		event.preventDefault()
		const personObject = { name: newName, number: newNumber, }

		if (persons.find((elem) => elem.name == personObject.name)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		personService
			.create(personObject)
			.then(response => {
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
			})
	}

	const removeContact = (per) => {
		if (window.confirm(`Delete ${per.name}?`)) {
			personService
				.remove(per.id)
				.then(response => response !== "error"
					? setPersons(persons.filter(person => person.id !== per.id))
					: console.log(response)
				)
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} con={addContact} chn={handleFilter} />
			<h3>Add a new</h3>
			<PersonForm sub={addContact} name={newName} number={newNumber} nameCh={handleNameChange} numberCh={handleNumberChange} />
			<h3>Numbers</h3>
			{persons.filter(person => person.name.includes(filter)).map(person =>
				<Persons key={person.id} person={person} del={removeContact} />
			)}
		</div>
	)

}

export default App
