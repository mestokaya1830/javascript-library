const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.render('home')
})
app.listen(3000, () => {
  console.log('Server is running...')
})