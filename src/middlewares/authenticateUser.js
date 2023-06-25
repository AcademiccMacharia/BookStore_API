const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization header required' });
  }

  const splittedHeader = req.headers.authorization.split(' ');
  if (splittedHeader[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Authorization format is Bearer <token>' });
  }

  const token = splittedHeader[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid authorization token. Please log in' });
    }
    next();
  });
};