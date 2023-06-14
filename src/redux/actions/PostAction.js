import axios from "axios";

export const GET_POST = "GET_POST";
export const GET_POST_ID = "GET_POST_ID";

export const createPost = (newPost) => {
    return async () => {
        const res = await axios.post("http://localhost:3001/post", newPost);
        return res;
    }
}

export const getPost = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3001/post");
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }
}

export const getPostId = (payload) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3001/post/${payload}`);
        dispatch({
            type: GET_POST_ID,
            payload: res.data
        })
    }
}