const Filter = ({ filter, con, chn }) => {
	return (
		<form onSubmit={con} >
			<div>filter shown with <input value={filter} onChange={chn} /></div>
		</form>
	)
}

export default Filter
