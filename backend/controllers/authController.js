const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name,
        email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
