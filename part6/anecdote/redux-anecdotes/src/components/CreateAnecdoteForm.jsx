import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const handleCreateAncedote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(asObject(anecdote))
    const newAnecdote = await anecdoteService.create(asObject(anecdote))
    dispatch(addAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAncedote}>
        <div><input name="anecdote"/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateAnecdoteForm