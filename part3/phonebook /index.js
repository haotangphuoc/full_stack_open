const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
app.use(express.static('dist'))

const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(result => {
            if(result) {
                response.json(result)
            }
            else {
                response.status(404).end()
            }
        })
})

app.get('/info/', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length}</p>   
            <p>${new Date()}</p>
         </div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.filter(note => note.id === id)
    if(person) {
        response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id != id)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if(!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    // else if(!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: "missing name or number"
    //     })
    // }
    // else if(persons.filter(person=> person.name === body.name)) {
    //     return response.status(400).json({
    //         error: "name already existed"
    //     })
    // }

    const newPerson = Person({
        name: body.name,
        number: body.number
    })
    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})