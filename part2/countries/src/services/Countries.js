import axios from 'axios'

const countriesListUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getList = () => {
    return axios
        .get(countriesListUrl)
        .then(response => {
            return response.data
        })
}

const getCountry = (countryName) => {
    return axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        .then(response => {
            return response.data
        })
}

export default {getList, getCountry}