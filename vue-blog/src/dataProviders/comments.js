import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export async function getComment(userToken, postId, commentId) {
  try {
    const res = await axios.get(`${BASE_URL}/posts/${postId}/${commentId}`, {
      headers: {
        userToken,
      },
    });

    return res.data;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function createComment(userToken, comment, postId) {
  try {
    const res = await axios.post(
      `${BASE_URL}/posts/${postId}`,
      { text: comment },
      {
        headers: {
          jwt: userToken,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function editComment(userToken, comment, postId, commentId) {
  try {
    const res = await axios.put(
      `${BASE_URL}/posts/${postId}/${commentId}`,
      { text: comment },
      {
        headers: {
          jwt: userToken,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function deleteComment(userToken, postId, commentId) {
  try {
    const res = await axios.delete(`${BASE_URL}/posts/${postId}/${commentId}`, {
      headers: {
        jwt: userToken,
      },
    });

    return res.data;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}
