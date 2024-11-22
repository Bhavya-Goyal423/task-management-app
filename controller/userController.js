const user = require('../Schema/userSchema');

class UserController {
  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const newUser = await user.create({ name, email, password });
      console.log(newUser);

      return res.status(201).json({
        status: 'success',
        message: 'User created',
      });
    } catch (error) {
      console.log(error.message);

      if (error.message.includes('duplicate')) {
        return res.status(400).json({
          status: 'failed',
          message: 'This email has already been used',
        });
      }
      return res.status(400).json({
        status: 'failed',
        error,
        msg: error.message,
      });
    }
  };
}

module.exports = UserController;
