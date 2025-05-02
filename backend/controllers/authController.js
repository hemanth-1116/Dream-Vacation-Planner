const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { registerUser, loginUser };
