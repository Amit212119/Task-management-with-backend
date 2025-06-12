import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
  console.log('Cookies:', req.cookies); 
  try {
    const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.log('Token not found');
      return res.status(401).json({ message: 'Unauthorized Request.!!' });
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken?._id).select('-password -refreshToken');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized Token!' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
