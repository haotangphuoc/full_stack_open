import axios from 'axios'
const baseUrl = '/api/persons'

const get = () => {
    return axios.get(baseUrl)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("Cant fetch data")
        })
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("Cant create new person")
        })
}

const deleteItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log("Cant delete person")
    })
}

const put = (id, editedPerson) => {
    return axios.put(`${baseUrl}/${id}`, editedPerson)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("Cant edit person" , error)
        })
}
export default {get, create, put, deleteItem}
