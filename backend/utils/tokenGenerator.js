import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fitness_guide_premium_secret_key_987654321', {
    expiresIn: '30d',
  });
};

export default generateToken;
