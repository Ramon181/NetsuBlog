// http://localhost:3001/personage

import axios from "axios";

export const ALL_CHARACTERS = "ALL_CHARACTERS";
export const ALL_ABILITY = "ALL_ABILITY";

export const crearCharcter = (newCharacter) => {
  return async () => {
    const res = await axios.post(
      "http://localhost:3001/personage",
      newCharacter
    );
    return res;
  };
};

export const createAility = (newAbility) => {
  return async () => {
    const res = await axios.post("http://localhost:3001/ability", newAbility);
    return res;
  };
};

export const allCharacters = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/personage");
    dispatch({
      type: ALL_CHARACTERS,
      payload: res.data,
    });
  };
};

export const allAbility = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/ability");
    dispatch({
      type: ALL_ABILITY,
      payload: res.data,
    });
  };
};
