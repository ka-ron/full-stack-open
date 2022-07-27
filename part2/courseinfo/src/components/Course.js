import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'


const Course = ({course}) => {
  

 

  return(
      <> 
      <h1>Web Development Curriculum</h1>
        <br></br>
      {course.map((courses =>
        <div key= {courses.id}>
            <Header course={courses.name} />
            <Content parts={courses.parts} />
            <Total sum={courses.parts} />
        </div>

    ))}
    
      </>
  )
}

  export default Course