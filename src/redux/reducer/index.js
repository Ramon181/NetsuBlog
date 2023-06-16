import { USER_ERROR, USER_INFO } from "../actions/UserAction";
import { GET_SERIE, GET_GENDER } from "../actions/SerieAction";
import { ALL_ABILITY, ALL_CHARACTERS } from "../actions/CharacterAction";
import { GET_POST, GET_POST_ID } from "../actions/PostAction";
import { ALL_REVIEW } from "../actions/ReviewAction";

const initialState = {
  user: {},
  errorUser: {},
  series: [],
  gender: [],
  ability: [],
  characters: [],
  post: [],
  postId: {},
  reviews: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    // usuarios

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

    // series

    case GET_SERIE:
      return {
        ...state,
        series: action.payload,
      };

    //personajes

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

    // Abilidades

    case ALL_ABILITY:
      return {
        ...state,
        ability: action.payload,
      };

    // publicaciones

    case GET_POST:
      return {
        ...state,
        post: action.payload
      }

    case GET_POST_ID:
      return {
        ...state,
        postId: action.payload
      }

    // comentarios

    case ALL_REVIEW:
      return {
        ...state,
        reviews: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
