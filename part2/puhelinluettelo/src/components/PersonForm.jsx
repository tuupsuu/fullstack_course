const PersonForm = ({ sub, name, number, nameCh, numberCh }) => {
	return (
		<form onSubmit={sub}>
			<div>name: <input value={name} onChange={nameCh} /></div>
			<div>number: <input value={number} onChange={numberCh} /></div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm
