const login = (data) => {
  // console.log(token);
  return {
    type: "LOGIN",
    payload: !data?._id
      ? { token: "", isAuth: false }
      : { token: "abcdefgh", isAuth: true, userType: data.type, user: data },
  };
};

const logout = () => {
  return {
    type: "LOGOUT",
  };
};

const loadUser = () => {
  return {
    type: "LOAD_USER",
  };
};

const registerUser = (data) => {
  return {
    type: "REGISTER",
    payload: !data?._id
      ? { token: "", isAuth: false }
      : { token: "abcdefgh", isAuth: true, userType: data.type, user: data },
  };
};

export default {
  login,
  logout,
  loadUser,
  registerUser,
};
