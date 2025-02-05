import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	return axios.get(baseUrl)
}

const create = newObject => {
	return axios.post(baseUrl, newObject)
}

const remove = id => {
	const req = axios.delete(`${baseUrl}/${id}`)
	return req.then(response => response.statusText == "OK"
		? id
		: response.status)
		.catch(error => "error")
}

const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
	getAll: getAll,
	create: create,
	remove: remove,
	update: update
}
