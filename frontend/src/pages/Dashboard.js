// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     itemName: "",
//     description: "",
//     type: "",
//     location: "",
//     date: "",
//     contactInfo: ""
//   });

//   // fetch items
//   const fetchItems = async () => {
//     const res = await axios.get("http://localhost:5000/api/items");
//     setItems(res.data);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // add item
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/items", form);
//     fetchItems();
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>

//       {/* Add Item Form */}
//       <form onSubmit={handleSubmit}>
//         <input name="itemName" placeholder="Item Name" onChange={handleChange} />
//         <input name="description" placeholder="Description" onChange={handleChange} />
//         <input name="type" placeholder="Lost/Found" onChange={handleChange} />
//         <input name="location" placeholder="Location" onChange={handleChange} />
//         <input name="date" onChange={handleChange} />
//         <input name="contactInfo" placeholder="Contact" onChange={handleChange} />
//         <button>Add Item</button>
//       </form>

//       {/* Display Items */}
//       <h3>All Items</h3>
//       {items.map((item) => (
//         <div key={item._id}>
//           <p>{item.itemName} - {item.type}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;

// 

import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
    date: "",
    contactInfo: ""
  });

  // 🔄 Fetch all items
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 📝 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/items", form);
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Search item
  const handleSearch = async () => {
    try {
      if (search === "") {
        fetchItems();
      } else {
        const res = await axios.get(
          `http://localhost:5000/api/items/search/${search}`
        );
        setItems(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* 🔓 Logout */}
      <button onClick={handleLogout}>Logout</button>

      {/* ➕ Add Item Form */}
      <form onSubmit={handleSubmit}>
        <input name="itemName" placeholder="Item Name" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="type" placeholder="Lost/Found" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="date" onChange={handleChange} />
        <input name="contactInfo" placeholder="Contact" onChange={handleChange} />
        <button>Add Item</button>
      </form>

      {/* 🔍 Search */}
      <input
        placeholder="Search item..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* 📄 Display Items */}
      <h3>All Items</h3>
      {items.map((item) => (
        <div key={item._id}>
          <p>{item.itemName} - {item.type}</p>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;