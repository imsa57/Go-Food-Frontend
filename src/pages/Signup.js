import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentialData, setCredentialData] = useState({});
  const navigate = useNavigate();
  const CreateUser = async () => {
    try {
      const response = await fetch(
        "https://food-app-one-lyart.vercel.app/user/createuser",
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
      if (data.success) {
        navigate("/login");
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
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
    <div className="container " style={{ marginTop: "120px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={onChange}
            required
          />
        </div>
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
            onChange={onChange}
            required
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="location"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="btn btn-danger m-3">
          Already a User
        </Link>
      </form>
    </div>
  );
};

export default Signup;
