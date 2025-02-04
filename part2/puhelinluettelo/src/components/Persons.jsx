const Persons = ({ person, del }) => {
	return (
		<div key={person.id}>
			{person.name} {person.number}
			<button onClick={() => del(person)}>Delete</button>
		</div>
	)
}

export default Persons
