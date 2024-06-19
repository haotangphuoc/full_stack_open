import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad
  const average = sum ? (good - bad) / sum : 0
  const postive = sum ? (good / sum) * 100 : 0

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <div className="buttons">
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral </button>
        <button onClick={handleBad}>bad</button>
      </div>

      <h1>statistics</h1>

      <div className="stats">
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {sum}</p>
        <p>average {average}</p>
        <p>positive {postive} %</p>
      </div>
    </div>
  )
}

export default App

