import React, { useEffect, useState } from "react";
import { api } from "../config";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../Actions";
import moment from "moment";

const Home = () => {
  const state = useSelector((state) => state.AuthReducer);
  console.log(state);
  const dispatch = useDispatch();
  const [state1, setState] = useState();

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
        for (let index = 0; index < res?.length; index++) {
          var monthLeft =
            12 - moment(state.userinfo.created_at).format("MM") + 1;
          console.log(monthLeft);
          res[index] = {
            ...res[index],
            applicable: (Number(res[index].days) / 12) * monthLeft,
          };
        }

        setState(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
        <h3> leaves policy : </h3>{" "}
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
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Applicable: </h3>
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
                <td>{item.applicable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Home;
