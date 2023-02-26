const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const { Quiz } = require('../db/schema')

exports.initServer = () => {
  const PORT = 3001

  // create express http server
  const app = express()

  // middleware
  app.use(bodyParser.json({}))
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
  }))

  // routers
  app.get('/quiz', async (req, res) => {
    const data = await Quiz.find({ deleted: false })
    res.send({
      success: true,
      message: 'Quiz list',
      data: data.map(item => ({
        id: item._id,
        name: item.name,
        category: item.category,
      }))
    })
  })
  app.get('/quiz/:id', async (req, res) => {
    const { id } = req.params
    const data = await Quiz.findOne({ _id: new ObjectId(id) })
    res.send({
      success: true,
      message: 'Quiz detail',
      data
    })
  })
  app.post('/quiz/create', async (req, res) => {
    const body = req.body || {}

    const data = await Quiz.create({
      name: body.name || '',
      mustBeSignIn: body.mustBeSignIn || false,
      question: body.question || [],
      scores: [],
      category: body.category || '',
      createAt: new Date(),
      deleted: false,
      createdBy: new ObjectId('123456789101')
    })

    res.send({
      success: true,
      message: 'Quiz created',
      data
    })
  })

  // return
  return {
    app,
    port: PORT,
    start: () => {
      return new Promise((resolve, reject) => {
        app.listen(PORT, () => {
          resolve()
        })
      })
    }
  }
}
