const Persons = ({persons, newSearch, handleDelete}) => {
    const displaySearch = () => {
        if(newSearch == '') {
          return persons.map(person =>
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
          )
        }
        return persons
          .filter(person => person.name.toLowerCase().includes(newSearch))
          .map(person =>
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
          )
    }
    return (
        <div>
            {displaySearch()}
        </div>
    )
}

export default Persons