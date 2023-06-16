import axios from "axios";

export const ALL_REVIEW = "ALL_REVIEW";

export const allReview = (postId) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3001/review/${postId}`);
        dispatch({
            type:ALL_REVIEW,
            payload: res.data
        })
    }
}

export const postReview = (newReview) => {
    return async () => {
        const res = await axios.post("http://localhost:3001/review", newReview);
        return res;
    }
}