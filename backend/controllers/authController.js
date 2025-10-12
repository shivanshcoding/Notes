import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const handleGoogleLogin = async (req, res) => {
  const { name, email, googleId } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      // If user doesn't exist, check if email is already in use
      user = await User.findOne({ email });
      if (user) {
        // Link Google ID to existing email account
        user.googleId = googleId;
        await user.save();
      } else {
        // Create a new user
        user = await User.create({ name, email, googleId });
      }
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};