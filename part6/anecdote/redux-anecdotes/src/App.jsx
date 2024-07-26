import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import ChangeFilterForm from './components/ChangeFilterForm'
import Notification from './components/Notifications'

const App = () => {
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