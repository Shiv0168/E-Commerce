const { Product } = require("../model/Product");

const postProduct = async (req, res) => {
  try {
    const data = await new Product(req.body).save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProduct = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  try {
    let query = Product.find({});
    let totalProductQuery = Product.find();

    if (req.query.name) {
      query = query.find({ name: req.query.name });
      totalProductQuery = totalProductQuery.find({ name: req.query.name });
    }

    if (req.query.email) {
      query = query.find({ email: req.query.email });
      totalProductQuery = totalProductQuery.find({ email: req.query.email });
    }

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalProductQuery.count().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "no Product found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findById(id);
    if (user) {
      const user1 = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(user1);
    } else {
      res
        .status(404)
        .json({ message: "no Product found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findById(id);
    if (user) {
      const user1 = await Product.deleteOne({ _id: id });
      res.status(201).json(user1);
    } else {
      res
        .status(404)
        .json({ message: "no Product found with id : " + id + " !!!" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  postProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
