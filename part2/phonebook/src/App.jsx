import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSubmit = () => {
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newSearch={newSearch} 
        handleNewSearch={e => setNewSearch(e.target.value.toLowerCase())}>
      </Filter> 
      <br />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNewNumber={e => setNewNumber(e.target.value)}
        handleSubmit={handleSubmit}
      />
      <br />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newSearch={newSearch}
      />
    </div>
  )
}

export default App
