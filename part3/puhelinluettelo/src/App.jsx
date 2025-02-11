import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './index.css'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notifText, setNotifMessage] = useState(null)

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
			let per = persons.find((elem) => elem.name == personObject.name)
			let perID = per.id
			personService
				.update(perID, personObject)
				.then(response => {
					setPersons(persons.map(pers => pers.id !== perID ? pers : response.data))
					setNewName('')
					setNewNumber('')
					setNotifMessage(`Updated ${personObject.name}`)
					setTimeout(() => { setNotifMessage(null) }, 5000)
				})
			return
		}

		personService
			.create(personObject)
			.then(response => {
				console.log(response)
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
				setNotifMessage(`Added ${personObject.name}`)
				setTimeout(() => { setNotifMessage(null) }, 5000)
			})
			.catch(error => {
				setNotifMessage(error.response.data.error)
				setTimeout(() => { setNotifMessage(null) }, 5000)
			})
	}

	const removeContact = (per) => {
		if (window.confirm(`Delete ${per.name}?`)) {
			personService
				.remove(per.id)
				.then(() => {
					setPersons(persons.filter(person => person.id !== per.id))
					setNotifMessage(`Removed ${per.name}`)
					setTimeout(() => { setNotifMessage(null) }, 5000)
				})
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

	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}

		return (
			<div className="success">
				{message}
			</div>
		)
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={notifText} />
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
