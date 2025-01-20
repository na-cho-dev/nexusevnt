// Desc: Middleware to verify if the user has the required role to access a route
export const roleMiddleware = (roles) => {
  const verifyRole = async (req, res, next) => {
    // Gets the user role from the user object
    const userRole = req.user.role;
    console.log(userRole);

    // Check if the user role is in the roles array
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: 'Access denied: Insufficient Permissions' });
    }

    // Else, the user has the required role and can proceed to the next middleware
    next();
  };

  return verifyRole;
};
