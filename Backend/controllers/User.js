const { User } = require("../model/User");

const postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(404).json({ message: "All field mandatory !!!" });
    } else {
      const data = await new User(req.body).save();
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "no user found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const user1 = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(user1);
    } else {
      res
        .status(404)
        .json({ message: "no user found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const user1 = await User.deleteOne({ _id: id });
      res.status(201).json(user1);
    } else {
      res
        .status(404)
        .json({ message: "no user found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  postUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
