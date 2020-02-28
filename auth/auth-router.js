const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../users/users-model.js');
const { jwtSecret } = require('../config/secrets.js');

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  try {
    const newUser = await User.add(user);
    const token = generateToken(newUser);

    res.status(201).json({
      user: newUser,
      token
    });
  }
  catch ({ message, stack, code }) {
    res.status(500).json({ message, stack, code });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome, ${user.username}!`,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  }
  catch ({ message, stack, code }) {
    res.status(500).json({ message, stack, code });
  }
});

function generateToken(user) {
  const payload = {
    sub: user.id
  };

  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;