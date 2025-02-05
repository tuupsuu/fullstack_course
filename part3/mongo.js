const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url =
	`mongodb+srv://fullstack:${password}@cluster0.evx9l.mongodb.net/contactApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('contacts', personSchema)

if (process.argv.length < 5) {
	Person.find({}).then(result => {
		result.forEach(per => {
			console.log(per)
		})
		mongoose.connection.close()
	})
} else {

	const name = process.argv[3]
	const number = process.argv[4]
	const person = new Person({
		name: name,
		number: number,
	})

	person.save().then(result => {
		console.log(`added ${name} number ${number} to phonebook`)
		mongoose.connection.close()
	})
}
