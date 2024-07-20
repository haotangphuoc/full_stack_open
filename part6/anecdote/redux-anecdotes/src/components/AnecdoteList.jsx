import { useDispatch, useSelector } from "react-redux"
import { addVotes } from "../reducers/anecdoteReducer"
const AnecdotesList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => a.votes - b.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVotes(id))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList