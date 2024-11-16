// middleware/adminAuthMiddleware.js

/**
 * Middleware to verify if the authenticated user has admin privileges
 * Requires authMiddleware to be run first to set req.user
 */


const adminAuthMiddleware = (req, res, next) => {
  try {
    // Check if user exists and has admin privileges
    if (!req.user) {
      return res.status(401).json({ msg: 'No authenticated user found' });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Admin access required' });
    }

    // User is authenticated and has admin privileges
    next();
  } catch (err) {
    console.error('Admin authorization error:', err);
    res.status(500).json({ msg: 'Server error during admin authorization' });
  }
};

module.exports = adminAuthMiddleware;