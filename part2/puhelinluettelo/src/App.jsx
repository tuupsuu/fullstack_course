import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from "axios"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('effect')
		axios.get('http://localhost:3001/persons').then(response => {
			console.log('promise fulfilled')
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

		axios
			.post('http://localhost:3001/persons', personObject)
			.then(response => {
				setPersons(persons.concat(response.data))
				setNewNumber('')
				setNewName('')
			})
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
				<Persons name={person.name} number={person.number} />
			)}
		</div>
	)

}

export default App
