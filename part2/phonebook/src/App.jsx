import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  })

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
