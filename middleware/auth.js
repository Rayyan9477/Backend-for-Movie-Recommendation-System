const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Debug

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ msg: 'XXXNo token, authorization denied' });
  }

  // Extract token
  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Debug

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};