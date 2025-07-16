import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId }; 
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Session expired. Please log in again.' });
      }

      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
          { userId: decodedRefresh.userId },
          process.env.JWT_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
        );

        req.user = { userId: decodedRefresh.userId }; 
        res.setHeader('x-new-access-token', newAccessToken);

        return next();
      } catch (refreshError) {
        return res.status(403).json({ message: 'Invalid refresh token. Please log in again.' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid access token' });
    }
  }
};

export default authenticateUser;
