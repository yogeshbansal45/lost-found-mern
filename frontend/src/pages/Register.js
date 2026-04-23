

// import { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("URL:", "http://localhost:5000/api/register");
//     await axios.post("http://localhost:5000/api/register", data);
//     alert("Registered");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" placeholder="Password" onChange={handleChange} />
//       <button>Register</button>
//     </form>
//   );
// }

// export default Register;

import { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // 🔑 Backend base URL
  const BASE_URL = process.env.REACT_APP_API;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/register`, data);
      alert("Registered Successfully");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button>Register</button>
    </form>
  );
}

export default Register;