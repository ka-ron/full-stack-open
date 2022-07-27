import React from 'react'


const Total = ({ sum }) => {
const totalexercises = sum.map(total => total.exercises)
const total = totalexercises.reduce((previousScore, currentScore) => previousScore+currentScore, 0)

  return (
 <p><b>
 Number of exercises : &nbsp;
 {total}
</b></p>

  )
}

export default Total