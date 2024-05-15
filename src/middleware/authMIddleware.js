const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }

  console.log('Alv');
  console.log(authHeader); // Aparece o valor q passo no thunderclient em header > authorization

  try {
    const decoded = jwt.verify(authHeader.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = authMiddleware;
