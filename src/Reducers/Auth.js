const initialState = {
  userinfo: JSON.parse(localStorage.getItem("userInfo")),
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem("isAuth"),
  userType: localStorage.getItem("userType"),
};

console.log(initialState);

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER":
      console.log(state.token);
      return {
        ...state,
      };
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuth", action.payload.isAuth);
      localStorage.setItem("userType", action.payload.userType);
      return {
        ...state,
        token: action.payload.token,
        isAuth: action.payload.isAuth,
        userType: action.payload.userType,
      };

    case "REGISTER":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuth", action.payload.isAuth);
      localStorage.setItem("userType", action.payload.userType);
      return {
        ...state,
        token: action.payload.token,
        isAuth: action.payload.isAuth,
        userType: action.payload.userType,
      };

    case "LOGOUT":
      localStorage.clear();

      return { ...state, token: "", isAuth: false };
    default:
      return state;
  }
}
export default AuthReducer;
