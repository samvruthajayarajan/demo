const userModel = require('../models/userModel');

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await userModel.createUser(name, email);
    res.json({ id: result.insertId, message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const [rows] = await userModel.getUsers();
  res.json(rows);
};

exports.getUser = async (req, res) => {
  const [rows] = await userModel.getUserById(req.params.id);
  res.json(rows[0]);
};

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;

  await userModel.updateUser(req.params.id, name, email);
  res.json({ message: "User updated" });
};

exports.deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
};