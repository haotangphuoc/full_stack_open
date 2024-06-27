const PersonForm = ({newName, handleNameChange, newNumber, handleNewNumber, handleSubmit}) => {
    
    return (
        <div>
            <form>
                <div>
                name: 
                <input 
                    value={newName}
                    onChange={e => handleNameChange(e)}
                />
                </div>

                <div>number: 
                <input 
                    value={newNumber}
                    onChange={e => handleNewNumber(e)}
                />
                </div>
                <div>
                <button type="submit" onClick={e => {
                    e.preventDefault()
                    handleSubmit()
                }}>add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm