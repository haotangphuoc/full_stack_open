import { useEffect, useState } from 'react'
import countriesService from './services/Countries'
import Countries from './components/Countries'


function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchedList, setSearchedList] = useState([])
  const [countriesNameList, setCountriesNameList] = useState([])
  const [searchedCountry, setSearchedCountry] = useState(null)

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleShow = (name) => {
    countriesService.getCountry(name).then(response => {
      setSearchedCountry(response)
  })}

  useEffect(() => {
    setSearchedList(countriesNameList.filter(country => country.name.includes(event.target.value.toLowerCase())))
  }, [searchInput])

  useEffect(() => {
    if(searchedList.length === 1) {
      countriesService.getCountry(searchedList[0].name).then(response => {
          setSearchedCountry(response)
          console.log(response)
      })
    }
    else {
      setSearchedCountry(null)
    }
  }, [searchedList])

  useEffect(() => {
    countriesService 
    .getList()
    .then(response => {
      const countries = response.map(country => ({
        name: country.name.common.toLowerCase(),
        id: Math.floor(Math.random() * 100000)
      }))
      setCountriesNameList(countries)
    })
  }, []) 

  return (
    <>
      <form>
        find countries
        <input type="text" value={searchInput} onChange={(e) => handleSearchChange(e)}/>
      </form>
      <Countries searchedList={searchedList} searchedCountry={searchedCountry} handleShow={handleShow}/>
    </>
  )
}

export default App
