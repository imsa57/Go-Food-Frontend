import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentialData, setCredentialData] = useState({});
  const navigate = useNavigate();
  const CreateUser = async () => {
    try {
      const response = await fetch(
        "https://food-app-one-lyart.vercel.app/user/loginuser",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("email", data.email);
        navigate("/");
      } else {
        alert(data);
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateUser();
  };

  const onChange = (e) => {
    setCredentialData({ ...credentialData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            required
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/signup" className="btn btn-danger m-3">
          New User
        </Link>
      </form>
    </div>
  );
};
export default Login;
