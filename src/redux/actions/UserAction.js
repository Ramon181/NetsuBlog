import axios from "axios";

// const url = "http://localhost:3001/user";

export const USER_INFO = "USER_INFO";
export const USER_ERROR = "USER_ERROR";

export const register = (newUser) => {
    console.log(newUser)
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/user/register", newUser);
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("role", "user");
      dispatch({
        type: USER_INFO,
        payload:JSON.parse(localStorage.getItem("user"))
      })
    }
    dispatch({
      type: USER_ERROR,
      payload: res.data,
    });
  };
};

export const login = (newUser) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/user/login",newUser);
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("role", "user");
      dispatch({
        type: USER_INFO,
        payload:JSON.parse(localStorage.getItem("user"))
      })
    }
    dispatch({
      type: USER_ERROR,
      payload: res.data,
    })
  }
}

export const userState = (payload) => {
    return {
      type: USER_INFO,
      payload,
    };
  };
