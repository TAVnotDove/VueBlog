import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export async function getAllPosts(userToken) {
  try {
    const res = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        jwt: userToken,
      },
    });

    return res.data.posts;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function getPost(userToken, postId) {
  try {
    const res = await axios.get(`${BASE_URL}/posts/${postId}`, {
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

export async function createPost(userToken, postData) {
  try {
    const res = await axios.post(`${BASE_URL}/posts`, postData, {
      headers: {
        jwt: userToken,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function editPost(userToken, postData, postId) {
  try {
    const res = await axios.put(`${BASE_URL}/posts/${postId}`, postData, {
      headers: {
        jwt: userToken,
      },
    });

    return res;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function deletePost(userToken, postId) {
  try {
    const res = await axios.delete(`${BASE_URL}/posts/${postId}`, {
      headers: {
        jwt: userToken,
      },
    });

    return res;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}

export async function searchPosts(userToken, searchTerm) {
  try {
    const res = await axios.get(
      `${BASE_URL}/posts-search?searchTerm=${searchTerm}`,
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
