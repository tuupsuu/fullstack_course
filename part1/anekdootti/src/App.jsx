import { useState } from 'react'

const Text = props => {
  return (
    <>
      <div>{props.anec}</div>
      <div>has {props.vote} votes</div>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [counters, setCounters] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const biggest = counters.reduce((maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Text anec={anecdotes[selected]} vote={counters[selected]} />

      <button onClick={() => {
        const copy = [...counters]
        copy[selected] += 1
        setCounters(copy)
        console.log(biggest)
      }}>vote</button>

      <button onClick={() => {
        const randint = Math.floor(Math.random() * (anecdotes.length - 0))
        setSelected(randint)
      }}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Text anec={anecdotes[biggest]} vote={counters[biggest]} />
    </>
  )
}

export default App