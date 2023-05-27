import axios from "axios";

export const GET_SERIE = "GET_SERIE";
export const GET_GENDER = "GET_GENDER";

export const createSerie = (newSerie) => {
   return async ()=>{
    const res = await axios.post("http://localhost:3001/serie", newSerie)
    return res
   }
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

