import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: (anec) => axios.put(`http://localhost:3001/anecdotes/${anec.id}`, {...anec, votes: anec.votes+1}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes']})
  })

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    updateMutation.mutate(anecdote)
    notificationDispatch({type: "SET", payload: `anecdote ${anecdote.content} voted` })
    setTimeout(() => {
      notificationDispatch({type: "SET", payload: '' })
    }, 5000)
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes'),
    retry: 1
  })

  if(result.isLoading) {
    return <div>... is loading</div>
  }
  else if(result.isError) {
    return <div>anecdote service not available due to problem in server</div>
  }

  const anecdotes = result.data.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification}/>
      <AnecdoteForm/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
