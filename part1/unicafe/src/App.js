import { useState } from 'react'


const StatisticsLine = ({total, name, value}) => {

  if (total === 0){

  return(
    null
  )
  }
  return( 
    <tr> 
    <td>{name}</td> 
   
    <td>{value}</td> </tr>

  )
}

const Button =({set, name, counter, settotal, total}) =>{
  return(
  <button onClick={() => {set(counter + 1); settotal(total + 1) ; } }> {name} </button>
  )
}

const Check = ({total}) => {
  
  if (total === 0){
  return(
   <p> No feedback given yet</p>
  )
  }
  return(
    null
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal]= useState(0)
  const average = ((good - bad) / total)
  const percentage = ((good / total) * 100) + "%"


  return (
    <div>

    <h1>Give Feedback</h1>
    <Button set={setGood} counter={good} total={total}  settotal={setTotal} name="Good"/>
    <Button set={setNeutral} counter={neutral} total={total}  settotal={setTotal}  name="Neutral"/>
    <Button set={setBad} counter={bad} total={total}  settotal={setTotal} name="Bad"/>
    
      
      
      <h1> Statistics</h1>

      <StatisticsLine name="Good :" value={good} total={total}/>
      <StatisticsLine name="Neutral :" value={neutral} total={total}/>
      <StatisticsLine name="Bad :" value={bad} total={total}/>
      <StatisticsLine name="Total :" value={total} total={total}/>
      <StatisticsLine name="Average points :" value={average} total={total}/>
      <StatisticsLine name="Percentage positive : &nbsp;" value={percentage} total={total}/>

      <Check total={total}/>
      
    </div>
  )
}

export default App
