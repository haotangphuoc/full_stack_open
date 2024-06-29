const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
app.use(express.static('dist'))

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name == 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

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
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if(!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newPerson = Person({
        name: body.name,
        number: body.number
    })
    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('api/persons/:id', (request, response) => {
    const body = request.body
    if(!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: True})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})