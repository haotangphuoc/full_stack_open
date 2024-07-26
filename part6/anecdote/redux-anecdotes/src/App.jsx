import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import ChangeFilterForm from './components/ChangeFilterForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ChangeFilterForm/>
      <AnecdotesList/>
      <CreateAnecdoteForm/>
    </div>
  )
}

export default App