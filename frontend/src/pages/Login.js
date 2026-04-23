// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await axios.post(
//       "http://localhost:5000/api/login",
//       data
//     );

//     localStorage.setItem("token", res.data.token); // 🔥 IMPORTANT

//     navigate("/dashboard"); // redirect
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" placeholder="Password" onChange={handleChange} />
//       <button>Login</button>
//     </form>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", data);

      // 🔥 IMPORTANT (paper requirement)
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // 🔥 redirect
      navigate("/dashboard");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button>Login</button>
    </form>
  );
}

export default Login;