import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const handleCreateAncedote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(anecdote))
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