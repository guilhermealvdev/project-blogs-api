const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function userFunction(req, res) {
  const { displayName, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const newUser = await User.create({ displayName, email, password });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

  return res.status(201).json({ token });
}

module.exports = { userFunction };