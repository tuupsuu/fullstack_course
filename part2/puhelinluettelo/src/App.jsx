import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '040-123 456'}, {name: 'Ada Lovelace', number: '123456'}, {name: 'Robert Downey Jr.', number: '46290'}])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const addContact = (event) => {
		event.preventDefault()
		const personObject = {name: newName, number: newNumber,}

		if (persons.find((elem) => elem.name == personObject.name)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		setPersons(persons.concat(personObject))
		setNewNumber('')
		setNewName('')
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
			<div>
			<form onSubmit={addContact}>
				<div>filter shown with <input value={filter} onChange={handleFilter} /></div>
			</form>
			</div>
			<h2>Add a new</h2>
			<form onSubmit={addContact}>
				<div>name: <input value={newName} onChange={handleNameChange} /></div>
				<div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.filter(person => person.name.includes(filter)).map(person =>
				<div>{person.name} {person.number}</div>
			)}
		</div>
	)

}

export default App
