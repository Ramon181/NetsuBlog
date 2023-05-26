import { USER_ERROR, USER_INFO } from "../actions/UserAction";
import {GET_SERIE, GET_GENDER} from "../actions/SerieAction";

const initialState = {
  user: {},
  errorUser: {},
  series:[],
  gender:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ERROR:
      return {
        ...state,
        errorUser: action.payload,
      };
    case GET_SERIE:
      return {
        ...state,
        series: action.payload
      }

    case GET_GENDER:
      return{
        ...state,
        gender: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
