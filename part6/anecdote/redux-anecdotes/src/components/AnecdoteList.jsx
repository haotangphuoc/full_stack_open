import { useDispatch, useSelector } from "react-redux"
import { addVotes } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdotesList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return [...state.anecdotes].sort((a, b) => a.votes - b.votes)
    }
    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => a.votes - b.votes)
  })

  const vote = (id) => {
    dispatch(addVotes(id))
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(changeNotification(`you voted '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(changeNotification(''))
    }, 5000);
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