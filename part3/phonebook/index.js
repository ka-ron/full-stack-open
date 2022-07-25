require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require("morgan");
// const mongoose = require('mongoose')



app.use(express.static('build'))

app.use(express.json())

const cors = require('cors')

app.use(cors())



// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
  
// })

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Persons = mongoose.model('Persons', personSchema)

const Persons = require('./models/person')


// var persons =[
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

morgan.token('data', function data (request) {
  return JSON.stringify(request.body)
})

 app.use(
morgan(':method :url :status :res[content-length] - :response-time ms :data'))





const currentday = new Date();

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }


// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
  
// })

app.get('/api/persons', (request, response) => {
  Persons.find({}).then(personsFound => {
    response.json(personsFound)
    
  })
})

app.get('/info', (request, response) => {
  Persons.find({}).then(personsFound => {
  response.send(`<h1>Info </h1> <p>Current amount of entries in Phonebook: ${personsFound.length} </p> <p>${currentday}</p>`)
  console.log(personsFound.length)
  })
})

app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  // console.log(id)
  // const personFound = persons.find(person => person.id === id)
  // console.log(personFound)
Persons.findById(request.params.id).then(person =>{
  response.json(person)
})


  // if (personFound) {
  // response.json(personFound)
  // }
  // else {
  //   response.status(404).end()
  // }
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  const nameEntry = body.name

  // const duplicateName = persons.find((p) => p.name === nameEntry)
  // // console.log(body.name)
  // // console.log(body.number)

  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
      
    })
    console.log('no content')
  }
    
  
  // }
  // if (duplicateName) {
  //   return response.status(400).json({ 
  //     error: 'already in phonebook' 
  //   })
  // }

 

  const person = new Persons({
    name: body.name,
    number: body.number,
    
    
    // id: generateId(),
  })

  // persons = persons.concat(person)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }
    )

  // console.log(person)
  // response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})