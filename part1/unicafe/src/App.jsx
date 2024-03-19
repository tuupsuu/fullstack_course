import { useState } from 'react'

const StatisticLine = props => <table><tbody><tr><td>{props.text}</td><td>{props.value}{props.pros}</td></tr></tbody></table>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all == 0) return (<div>No feedback given</div>)
  return (
    <>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(good - bad) / (good + bad + neutral)} />
      <StatisticLine text='positive' value={good / all * 100} pros='%' />
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App