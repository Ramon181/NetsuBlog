import axios from "axios";

const GET_SERIE = "GET_SERIE";
const GET_GENDER = "GET_GENDER";

export const createSerie = async (newSerie) => {
   return await axios.post("http://localhost:3001/serie", newSerie)
}

export const getSerie = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3001/serie")
        dispatch({
            type: GET_SERIE,
            payload: res.data
        })
    }
}

export const getGender = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3001/gender")
        dispatch({
            type: GET_GENDER,
            payload: res.data
        })
    }

}

