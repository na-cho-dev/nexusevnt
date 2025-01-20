const allowedOrigins = [
  "http://localhost:3000", // Add your local client URL
  //"https://your-production-client.com", // Add your production client URL
];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // Allow specific origins
  } else {
    res.header("Access-Control-Allow-Origin", "null"); // Block unauthorized origins
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies if needed

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
};

export default corsMiddleware;
