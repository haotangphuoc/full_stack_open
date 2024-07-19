import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, url) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, {title, url}, config)
  return response.data
}

const put = async (id, body) => {
  const response = await axios.put(`${baseUrl}/${id}`, body)
}


export default { setToken, getAll, create, put }