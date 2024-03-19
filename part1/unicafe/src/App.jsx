import { useState } from 'react'

const Display = props => <div>{props.text} {props.value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all == 0) return (<div>No feedback given</div>)
  return (
    <>
      <Display value={good} text='good' />
      <Display value={neutral} text='neutral' />
      <Display value={bad} text='bad' />
      <Display value={all} text='all' />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive value={all} positive={good} />
    </>
  )
}

const Average = ({ good, neutral, bad }) => {
  if (good == 0 && neutral == 0 && bad == 0) return (<div>average 0</div>)
  const arvo = (good - bad) / (good + bad + neutral)
  return (
    <div>average {arvo}</div>
  )
}

const Positive = props => {
  const arvo = props.positive / props.value
  if (props.positive == 0) { return (<div>positive 0 %</div>) }
  return (<div>positive {arvo} %</div>)
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
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App