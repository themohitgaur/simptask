import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../config";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../Actions";

const Login = () => {
  const state = useSelector((state) => state.AuthReducer);
  console.log(state);
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
      console.log(res);
      dispatch(allActions.authActions.login(res));
    } catch (error) {}
  };

  if (state?.isAuth && state.userType == "User") {
    return <Redirect to="/" />;
  } else if (state?.isAuth && state.userType == "Admin") {
    return <Redirect to="/admin" />;
  } else {
    return (
      <div className="container col-lg-4 my-5">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              value={data.email}
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              value={data.password}
              name="password"
              onChange={handleChange}
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" onClick={submit} class="btn btn-primary">
            Submit
          </button>
          <br />
          <br />
          <Link to="/register">Don't Have an Account ? Register</Link>
        </form>
      </div>
    );
  }
};

export default Login;
