import { USER_ERROR, USER_INFO } from "../actions/UserAction";
import { GET_SERIE, GET_GENDER } from "../actions/SerieAction";
import { ALL_ABILITY, ALL_CHARACTERS } from "../actions/CharacterAction";

const initialState = {
  user: {},
  errorUser: {},
  series: [],
  gender: [],
  ability: [],
  characters: [],
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
        series: action.payload,
      };

    case GET_GENDER:
      return {
        ...state,
        gender: action.payload,
      };

    case ALL_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
      
    case ALL_ABILITY:
      return {
        ...state,
        ability: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
