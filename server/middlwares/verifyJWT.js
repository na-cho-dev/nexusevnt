import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader); // Bearer <token>
  if (!authHeader)
    return res
      .status(401)
      .json({ message: 'Unauthorized Access from verifyJWT.js' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = decoded.email;
    next();
  });
};

export default verifyJWT;
