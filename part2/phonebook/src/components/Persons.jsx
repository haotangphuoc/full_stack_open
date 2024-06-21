const Persons = ({persons, newSearch}) => {
    const displaySearch = () => {
        if(newSearch == '') {
          return persons.map(person =>
            <p key={person.id}>{person.name} {person.number}</p>
          )
        }
        return persons
          .filter(person => person.name.toLowerCase().includes(newSearch))
          .map(person =>
            <p key={person.id}>{person.name} {person.number}</p>
          )
    }
    return (
        <div>
            {displaySearch()}
        </div>
    )
}

export default Persons