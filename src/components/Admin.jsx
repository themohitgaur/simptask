import React, { useEffect, useState } from "react";

import { api } from "../config";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../Actions";

const Admin = () => {
  const state = useSelector((state) => state.AuthReducer);
  console.log(state);
  const dispatch = useDispatch();

  const [data, setData] = useState({ name: "", days: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [state1, setState] = useState();
  console.log(state1);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api}/getpolicy`)
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
        setState(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    var x = false;
    for (let index = 0; index < state1.length; index++) {
      if (state1[index].name === data.name) {
        x = true;
      }
    }
    if (!x) {
      try {
        const res = await fetch(`${api}/policy`, {
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
        setData(res);
        const x = [...state1];
        x.push(res);
        setState(x);
        setData({ name: "", days: "" });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Leave name cannot be same");
    }
  };

  const deletePolicy = async (id, i) => {
    try {
      const res = await fetch(`${api}/deletePolicy/${id}`, {
        method: "DELETE",
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

      const x = [...state1];

      x.splice(i, 1);
      setState(x);
    } catch (err) {
      console.log(err);
    }
  };

  if (!state?.isAuth) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <div className="d-flex justify-content-end ">
          {" "}
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(allActions.authActions.logout())}
          >
            Logout
          </button>
        </div>
        <div>
          <div className="container col-lg-3 my-3">
            <input
              className="form-control my-2"
              type="text"
              value={data.name}
              placeholder="Enter leave name"
              name="name"
              onChange={handleChange}
            />
            <input
              name="days"
              className="form-control my-2"
              type="number"
              onChange={handleChange}
              placeholder="Enter number of days"
              value={data.days}
            />
            <button className="btn btn-success" onClick={submit}>
              Submit
            </button>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Leave </th>
              <th scope="col">Days</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {state1?.map((item, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.days}</td>
                <td>
                  <button
                    onClick={() => deletePolicy(item._id, i)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Admin;
