import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
	const [newName, setNewName] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
		}
		if (persons.find((elem) => elem.name == personObject.name)) {
			alert(`${newName} is already added to phonebook`)
			return
		}
		setPersons(persons.concat(personObject))
		setNewName('')
	}

	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson} onChange={handleNameChange}>
				<div>
					name: <input value={newName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(name =>
				<div>{name.name}</div>
			)}
		</div>
	)

}

export default App
