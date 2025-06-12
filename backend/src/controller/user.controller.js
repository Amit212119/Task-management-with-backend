import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields required.' });
  }

  const existUser = await User.findOne({ email });
  if (existUser) return res.status(409).json({ message: 'User already exists.' });

  const user = await User.create({ name, email, phone, password });

  res.status(201).json({ message: 'Registered successfully' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await user.isCorrectPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  };

  res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      {
        user: accessToken,
        refreshToken,
        loggedInUser,
      },
      'User loggedIn Successfully!'
    );
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: '',
        },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    };

    return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).json({ error: 'Logout failed' });
  }
};

const userProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { name, email, phone } = req.user;
  return res.status(200).json({ name, email, phone });
};

export { registerUser, loginUser, logoutUser, userProfile };
