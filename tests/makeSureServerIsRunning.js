const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Make sure server is running', () => {
  it('should return a page with status 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})
