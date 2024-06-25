const Countries = ({searchedList, searchedCountry, handleShow}) => {
    if(searchedCountry != null) {
        console.log(searchedCountry)
        return(
          <div>
            <h1>{searchedCountry.name.common}</h1>
            <p>capital {searchedCountry.capital}</p>
            <p>area {searchedCountry.area}</p>
            <b>languages:</b>
            {Object.values(searchedCountry.languages).map(lang => {
                return <li>{lang}</li>
            })}
            <p style={{ 'font-size': '8rem', 'margin': '0' }}>{searchedCountry.flag}</p>
          </div>
        )
    }
    else if(searchedList.length >= 10) {
        return(<p>Too much countries</p>)
    }
    else if(searchedList.length < 10) {
        return((searchedList.map(country => 
            <div key={country.id}>
                <p>{country.name} <button onClick={() => handleShow(country.name)} >show</button></p>
            </div>
        )))
    }
    return
}

export default Countries