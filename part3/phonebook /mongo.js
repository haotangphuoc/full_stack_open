const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
    console.log("Lack appropriate arguments")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://haotangphuoc:${password}@cluster0.yorpnkd.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

// If given 5 arguments, create new Person and save it to the db
if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const newPerson = new Person({
        name: name,
        number: number
    })

    newPerson.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

// Else, clog all the person in db
Person.find({}).then(results => {
    console.log('\n')
    console.log('phonebook:')
    results.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
    console.log('\n')
    mongoose.connection.close()
})

