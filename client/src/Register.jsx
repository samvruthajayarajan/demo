import { useEffect, useState } from "react";
import axios from "axios";

function Register() {
  const API = "http://localhost:5000/api/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch users
  const fetchUsers = () => {
    axios.get(API)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add / Update
  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`${API}/${editId}`, { name, email });
      setEditId(null);
    } else {
      await axios.post(API, { name, email });
    }

    setName("");
    setEmail("");
    fetchUsers();
  };

  // Delete
  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  // Edit
  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Register Page</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Register"}
      </button>

      <hr />

      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map(user => (
          <div key={user.id}>
            <p>{user.name} - {user.email}</p>
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Register;