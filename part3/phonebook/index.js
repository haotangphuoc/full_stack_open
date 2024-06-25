const express = require('express')
const app = express()
app.use(express.json())

let notes = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/info/', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${notes.length}</p>   
            <p>${new Date()}</p>
         </div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = notes.filter(note => note.id === id)
    if(person) {
        response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if(!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    else if(!body.name || !body.number) {
        return response.status(400).json({
            error: "missing name or number"
        })
    }
    else if(notes.filter(note => note.name === body.name)) {
        return response.status(400).json({
            error: "name already existed"
        })
    }
    const person = {
        id: Math.floor(Math.random()*100000),
        name: body.name,
        number : body.number
    }
    notes = notes.concat(person)
    response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})