import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ userType: "customer" });
    res.send(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, middleName, lastName, email, password } = req.body;

        let updatedData = { firstName, middleName, lastName, email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        res.send({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};
const getUserDetails = async (req, res) => {
  const userId = req.params.userId; 

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export { getCustomers, updateUser, getUserDetails };