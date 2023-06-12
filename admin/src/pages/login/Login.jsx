import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCall';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    // navigate("/");
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%", justifyContent: "center", alignItems: "center" }}>
      <input
        style={{ padding: "10px", marginBottom: "20px", width: "200px" }}
        type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <input
        style={{ padding: "10px", marginBottom: "20px", width: "200px" }}
        type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button
        style={{ padding: "10px", width: "100px" }} onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login