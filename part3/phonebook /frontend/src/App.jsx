import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import personService from './services/notes.js'
import ErrorMessage from './components/ErrorMesage.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService.get().then(fetchedPersons => setPersons(fetchedPersons))
  })

  const handleSubmit = () => {
    const foundPerson = persons.find(person => person.name === newName)
    if(foundPerson) {
      const confirmPatching = confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)
      if(confirmPatching) {
        personService.put(foundPerson.id, {...foundPerson, number: newNumber})
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id != updatedPerson.id ? person : foundPerson))
        })
        .catch(error => {
          setError(true)
          setMessage(`Information of ${newName} has already removed from server`)
        })
      }
    }
    else {
      console.log(persons.length)
      const newPerson = {name: newName, number: newNumber, id: Math.floor(Math.random()*100000).toString()}
      personService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setError(false)
          setMessage(`Added ${newName}`)
        })
        .catch(error => {
          setError(true)
          setMessage(error.toString())
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = id => {
    personService.deleteItem(id)
    .then(
      setPersons(persons.filter(person => person.id != id))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage 
        error={error}
        message={message}
      />
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
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
