const db = require('../config/db');

const createUser = (name, email) => {
  return db.execute(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
};

const getUsers = () => {
  return db.execute("SELECT * FROM users");
};

const getUserById = (id) => {
  return db.execute("SELECT * FROM users WHERE id=?", [id]);
};

const updateUser = (id, name, email) => {
  return db.execute(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id]
  );
};

const deleteUser = (id) => {
  return db.execute("DELETE FROM users WHERE id=?", [id]);
};

module.exports = {createUser,getUsers,getUserById,updateUser,deleteUser};