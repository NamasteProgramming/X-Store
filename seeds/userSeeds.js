const User = require('../modules/users/models/User')

const seedUsers = async () => {
  try {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'john@example.com'
    })
    await user.save()
  } catch (e) {}
}

seedUsers()
