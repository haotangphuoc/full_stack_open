import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import ChangeFilterForm from './components/ChangeFilterForm'
import Notification from './components/Notifications'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

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