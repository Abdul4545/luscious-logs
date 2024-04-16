import React, { useState} from "react";

import { useNavigate } from "react-router-dom";

function Signup(props) {

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
    canfirmpassword: "",
  });

  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    setShow(!show)
  }



  const handleSubmit = async (event) => {
    event.preventDefault()
    const {email, name, password} = credentials;

    // API Call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({email, name, password}),
    });

    const json = await response.json()
    console.log(json)

    if(json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created Successfully", "success")
    }

    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  

  }



  return (
    <div className="container mt-2">
      <h2>Create an account to use Lusciuos Logs</h2>
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
            aria-describedby="emailHelp"
            onChange={onChange}
          />

          <div id="emailHelp" className="form-text my-2">
            We'll never share your email with anyone else.
          </div>

          <label htmlFor="name" className="form-label">
            Enter Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            autoComplete=""
            minLength={5}

          />
        </div>

        <div className="mb-3">
          <label htmlFor="canfirmpassword" className="form-label">
            Canfirm Password
          </label>
          <input
            type={show ? "text" : "password"}
            className="form-control"
            id="canfirmpassword"
            name="canfirmpassword"
            onChange={onChange}
            autoComplete=""
            minLength={5}
          />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="checkpassword" onChange={showPassword}/>
          <label className="form-check-label" htmlFor="checkpassword">
            Show Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
