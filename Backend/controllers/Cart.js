const { Cart } = require("../model/Cart");

const postCart = async (req, res) => {
  try {
      const data = await new Cart(req.body).save();
      res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCart = async (req, res) => {
  try {
    const data = await Cart.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCartByUser = async (req, res) => {
  try {
    const { user } = req.query;
    const cart = await Cart.find({user:user}).populate('product').populate('user');
    if (cart) {
      res.status(200).json(cart);
    } else {
      res
        .status(404)
        .json({ message: "no user found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Cart.findById(id);
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

const deleteCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Cart.findById(id);
    if (user) {
      const user1 = await Cart.deleteOne({ _id: id });
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
  postCart,
  getAllCart,
  getCartByUser,
  updateCartById,
  deleteCartById,
};
