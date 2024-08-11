import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (obj) => {
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const addVote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`
  const getReponse = await axios.get(anecdoteUrl)
  const anecdoteToChange = getReponse.data
  const response = await axios.put(anecdoteUrl, {...anecdoteToChange, votes: anecdoteToChange.votes + 1})
  return response.data
}

export default { getAll, create, addVote }