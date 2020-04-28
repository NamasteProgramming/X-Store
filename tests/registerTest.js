const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Make sure server is returning registration page', () => {
  it('should return a page with status 200', (done) => {
    chai.request(app)
      .get('/register')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})

describe('Make sure register fails on no data', () => {
  it('should return validation errors', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .end((err, res) => {
        if (err) return done(err)
        res.text.should.contain('Validation Errors')
        done()
      })
  })
})

describe('Make sure register is successfull with valid data', () => {
  const email = `john.${new Date().getTime()}@example.com`
  it('should return success in respones', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        email,
        name: 'John Doe',
        password: '12345678',
        repeat_password: '12345678'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.not.contain('Validation Errors')
        done()
      })
  })

  it('should return validation error about unique email', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        email,
        name: 'John Doe',
        password: '12345678',
        repeat_password: '12345678'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.contain('Email already exists')
        res.text.should.contain('Validation Errors')
        done()
      })
  })
})
