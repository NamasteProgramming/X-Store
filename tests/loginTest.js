const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const User = require('../modules/users/models/User')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Make sure server is returning login page', () => {
  it('should return a page with status 200', (done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})

describe('Make sure login fails invalid data', () => {
  it('should return validation errors', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .end((err, res) => {
        if (err) return done(err)
        res.text.should.contain('Missing credentials')
        done()
      })
  })
})

describe('Make sure login returns User not found when used with invalid email', () => {
  const email = `john.${new Date().getTime()}@example.com`
  it('should return User not found in respones', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email,
        password: '12345678'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.contain('User not found')
        done()
      })
  })
})

describe('Make sure login returns Incorrect password', () => {
  it('should return Incorrect password in respones', (done) => {
    User.findOne({}, { email: 1 })
      .then(user => {
        const agent = chai.request.agent(app)
        agent
          .post('/login')
          .type('form')
          .send({
            email: user.email,
            password: new Date().getTime()
          })
          .end((err, res) => {
            if (err) return done(err)
            res.should.have.status(200)
            res.text.should.contain('Incorrect password')
            done()
          })
      })
  })
})

describe('Make sure login is working with correct data', () => {
  it('should return welcome respones', (done) => {
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'john@example.com',
        password: 'john@example.com'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.contain('welcome')
        done()
      })
  })
})
