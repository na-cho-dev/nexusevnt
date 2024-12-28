const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Edit to Client url
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

export default corsMiddleware;
