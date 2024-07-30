import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import ChangeFilterForm from './components/ChangeFilterForm'
import Notification from './components/Notifications'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdote } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(response => {
      dispatch(setAnecdote(response))
    })
  }, [])

  return (
    <div>
      <ChangeFilterForm/>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdotesList/>
      <CreateAnecdoteForm/>
    </div>
  )
}

export default App