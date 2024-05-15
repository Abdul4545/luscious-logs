import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {

  const [credentials, setCredentials] = useState({email: "", password: ""})

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  const handleSubmit = async (event) => {
    event.preventDefault();

    // API Call
    const response = await fetch("http://localhost:5000/api/auth/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({email: credentials.email, password: credentials.password}),
    });

    const json = await response.json()
    if(json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged in Successfully", "success")
      navigate("/");
    }

    else {
      props.showAlert("Invalid Details", "danger")
    }

  }

  return (
    <div className="container mt-2">
      <h2>Login to Continue to Luscious Logs</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
