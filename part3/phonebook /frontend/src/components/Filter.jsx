const Filter = ({newSearch, handleNewSearch}) => {
    return (
        <div>
            <form>
                <div>
                    filter shown 
                    <input value={newSearch} onChange={e => handleNewSearch(e)}/>
                </div>
            </form>
        </div>
    )
}

export default Filter